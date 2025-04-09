from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'issues', views.IssueViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include('accounts.urls', namespace='accounts')),
    path('issues/<int:issue_id>/assign/', views.AssignIssueView.as_view(), name='assign-issue'),  
    path('issues/<int:issue_id>/resolve/', views.ResolveIssueView.as_view(), name='resolve-issue'),  
    path('issues/<int:issue_id>/lecturer-resolve/', views.LecturerResolveIssueView.as_view(), name='lecturer-resolve-issue'),

]