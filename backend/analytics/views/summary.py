from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import Count
from django.utils.timezone import now, timedelta
from forms.models import Student, Submission

def calculate_trend(data):
    if len(data) < 2:
        return 'neutral'
    if data[-1] > data[-2]:
        return 'up'
    elif data[-1] < data[-2]:
        return 'down'
    return 'neutral'

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

    bar_data = [{'name': k, 'Male': v['Male'], 'Female': v['Female']} for k, v in result.items()]
    return Response(bar_data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def summary_data_view(request):
    today = now().date()
    days_back = 20
    date_list = [today - timedelta(days=i) for i in range(days_back)][::-1]

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
            "interval": f"Registered users as of {today.strftime('%b %d')}",
            "data": student_counts,
        },
        {
            "title": "SCIF Submissions",
            "value": Submission.objects.filter(
                form_type='Student Cumulative Information Sheet',
                status='submitted'
            ).count(),
            "trend": calculate_trend(scif_counts),
            "interval": f"SCIF Submissions This Month (recent - {today.strftime('%b %d')})",
            "data": scif_counts,
        },
        {
            "title": "BIS Submissions",
            "value": Submission.objects.filter(
                form_type='Basic Information Sheet',
                status='submitted'
            ).count(),
            "trend": calculate_trend(bis_counts),
            "interval": f"BIS Submissions This Month (recent - {today.strftime('%b %d')})",
            "data": bis_counts,
        },
    ]
    return Response({"summary": summary})

@api_view(['GET'])
@permission_classes([IsAdminUser])
def recent_submissions_view(request):
    recent = Submission.objects.filter(status='submitted').order_by('submitted_on')[:4]
    data = [
        {
            "id": Submission.id,
            "submittedBy": f"{Submission.student.first_name} {Submission.student.last_name}",
            "date": Submission.submitted_on.strftime('%Y-%m-%d') if Submission.submitted_on else '',
            "formType": "Student Cumulative Information File" if "Cumulative" in Submission.form_type else "Basic Information SHeet"
        }
        for Submission in recent
    ]
    return Response(data)

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
