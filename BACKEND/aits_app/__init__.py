from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, DepartmentViewSet, IssueViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)  # Endpoint for CustomUser 
router.register(r'departments', DepartmentViewSet)  # Endpoint for Department
router.register(r'issues', IssueViewSet)  # Endpoint for Issue

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]