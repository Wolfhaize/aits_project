from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import LecturersByDepartmentView #added this



router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'issues', views.IssueViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('issues/<int:issue_id>/assign/', views.AssignIssueView.as_view(), name='assign-issue'),
    path('issues/<int:issue_id>/resolve/', views.ResolveIssueView.as_view(), name='resolve-issue'),
    path('departments/<int:pk>/lecturers/', LecturersByDepartmentView.as_view(), name='department-lecturers'),
     

   
    
    ]
