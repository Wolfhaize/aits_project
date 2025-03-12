# SDP/urls.py (or your project's main urls.py file)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('SDPapp.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
  
] 