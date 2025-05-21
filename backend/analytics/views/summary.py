from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import Count
from django.utils.timezone import now, timedelta
from forms.models import Student, Submission
from analytics.serializers import RecentSubmissionSerializer

def calculate_trend(data):
    if len(data) < 2:
        return 'neutral'
    if data[-1] > data[-2]:
        return 'up'
    elif data[-1] < data[-2]:
        return 'down'
    return 'neutral'

def calculate_trend_percentage(data):
    if len(data) < 2:
        return 0

    mid = len(data) // 2
    early_avg = sum(data[:mid]) / max(1, mid)
    late_avg = sum(data[mid:]) / max(1, len(data) - mid)

    if early_avg == 0:
        return 0

    percent = ((late_avg - early_avg) / early_avg) * 100
    return round(percent, 2)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def bar_data_view(request):
    grouped = (
        Student.objects
        .values('degree_program', 'sex')
        .annotate(total=Count('student_number'))
    )

    result = {}
    for entry in grouped:
        prog = entry['degree_program']
        sex = entry['sex']
        if prog not in result:
            result[prog] = {'Male': 0, 'Female': 0}
        result[prog][sex] = entry['total']

    bar_data = [
        {
            'name': k,
            'Male': v.get('Male', 0),
            'Female': v.get('Female', 0)
        }
        for k, v in result.items()
    ]

    total_students = Student.objects.count()

    return Response({
        "barData": bar_data,
        "totalStudents": total_students
    })

@api_view(['GET'])
@permission_classes([IsAdminUser])
def summary_data_view(request):
    today = now().date()
    days_back = 20
    date_list = [today - timedelta(days=i) for i in range(days_back)][::-1]
    date_labels = [d.strftime('%b %d') for d in date_list]

    student_counts = [
        Student.objects.filter(is_complete=True, completed_at__date=day).count()
        for day in date_list
    ]

    scif_counts = [
        Submission.objects.filter(
            form_type='Student Cumulative Information Sheet',
            status='submitted',
            submitted_on__date=day
        ).count()
        for day in date_list
    ]

    bis_counts = [
        Submission.objects.filter(
            form_type='Basic Information Sheet',
            status='submitted',
            submitted_on__date=day
        ).count()
        for day in date_list
    ]

    summary = [
        {
            "title": "Total Number of Students",
            "value": Student.objects.count(),
            "trend": calculate_trend(student_counts),
            "trendPercent": calculate_trend_percentage(student_counts),
            "interval": f"Registered users as of {today.strftime('%b %d')}",
            "data": student_counts,
            "trendData": {
                "labels": date_labels,
                "values": student_counts,
            }
        },
        {
            "title": "SCIF Submissions",
            "value": Submission.objects.filter(
                form_type='Student Cumulative Information Sheet',
                status='submitted'
            ).count(),
            "trend": calculate_trend(scif_counts),
            "trendPercent": calculate_trend_percentage(scif_counts),
            "interval": f"SCIF Submissions This Month (recent - {today.strftime('%b %d')})",
            "data": scif_counts,
            "trendData": {
                "labels": date_labels,
                "values": scif_counts,
            }
        },
        {
            "title": "BIS Submissions",
            "value": Submission.objects.filter(
                form_type='Basic Information Sheet',
                status='submitted'
            ).count(),
            "trend": calculate_trend(bis_counts),
            "trendPercent": calculate_trend_percentage(bis_counts),
            "interval": f"BIS Submissions This Month (recent - {today.strftime('%b %d')})",
            "data": bis_counts,
            "trendData": {
                "labels": date_labels,
                "values": bis_counts,
            }
        },
    ]
    return Response({"summary": summary})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def recent_submissions_view(request):
    try:
        submissions = (
            Submission.objects
            .filter(status="submitted")
            .order_by('-submitted_on')[:5]
        )
        serializer = RecentSubmissionSerializer(submissions, many=True)
        return Response(serializer.data, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def recent_drafts_view(request):
    drafts = Submission.objects.filter(status='draft').order_by('saved_on')[:4]
    data = [
        {
            "id": s.id,
            "formType": s.form_type,
            "student": f"{s.student.first_name} {s.student.last_name}"
        }
        for s in drafts
    ]
    return Response(data)
