from django.urls import path
from .views import register, login_view

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
