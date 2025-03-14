from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),  # Add parentheses to call as_view()
    path('login/', views.LoginView.as_view(), name='login'),          # Add parentheses to call as_view()
    path('logout/', views.LogoutView.as_view(), name='logout'),       # Add parentheses to call as_view()
]