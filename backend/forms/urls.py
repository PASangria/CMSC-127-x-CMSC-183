from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.profilesetup import create_student_profile, get_student_profile
from .views.GeneralSubmissionViewSet import FormBundleView, FinalizeSubmissionView
from .views.adminDisplay import AdminStudentListView, get_student_profile_by_id, AdminBISList, AdminStudentFormsView
from .views.display import SubmissionViewSet 
from .views.getEnums import EnumChoicesView

app_name= 'forms'

router = DefaultRouter()
router.register(r'submissions', SubmissionViewSet, basename='submission')

urlpatterns = [
    path('student/profile/create/', create_student_profile),
    path('student/profile/', get_student_profile),
     path('admin/basic-information-sheet-submissions', AdminBISList.as_view(), name='get_bis_students'),
    path('<str:form_type>/', FormBundleView.as_view(), name='form-bundle'),
    path('finalize/<int:submission_id>/', FinalizeSubmissionView.as_view(), name='finalize-submission'),
    path('admin/students/', AdminStudentListView.as_view(), name='admin-student-list'),
    path('admin/students/<str:student_id>/', get_student_profile_by_id),
    path('get/enums/', EnumChoicesView.as_view(), name='enum-choices'),
    path('admin/student-forms/<str:student_id>/', AdminStudentFormsView.as_view()),
    
    path('display/', include(router.urls)), 
]
