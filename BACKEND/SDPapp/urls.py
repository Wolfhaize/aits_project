from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'departments', views.DepartmentViewSet)
router.register(r'issues', views.IssueViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/issues/<int:issue_id>/assign/', views.AssignIssueView.as_view(), name='assign-issue'),
    path('api/issues/<int:issue_id>/resolve/', views.ResolveIssueView.as_view(), name='resolve-issue'),
    
    ]