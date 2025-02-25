from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IssueViewSet, DepartmentViewSet, UserViewSet

router = DefaultRouter()
router.register(r'issues', IssueViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
