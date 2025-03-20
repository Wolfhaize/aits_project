from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    CustomUserViewSet,
    RegistrationView,
    ForgotPasswordView,
    ResetPasswordView,
    DepartmentViewSet,
    IssueViewSet,
    update_profile,
)

# Router for viewsets
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)  # /users/
router.register(r'departments', DepartmentViewSet)  # /departments/
router.register(r'issues', IssueViewSet, basename='issue')  # /issues/

urlpatterns = [
    # Register and update user profile
    path('update-profile/', update_profile, name='update_profile'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', RegistrationView.as_view(), name='register'),
    path('forgotPassword/', ForgotPasswordView.as_view(), name='forgotPassword'),
    path('resetPassword/', ResetPasswordView.as_view(), name='resetPassword'),

    # Include the router URLs for other resources
    path('', include(router.urls)),  # All router URLs will be under /api/
]