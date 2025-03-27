# accounts/views.py

from django.contrib.auth.decorators import user_passes_test
from django.utils.decorators import method_decorator
from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer, LoginSerializer, LogoutSerializer
from django.contrib.auth import authenticate, logout

# Custom decorator to check if user is in a specific group
def group_required(group_name):
    def in_group(user):
        return user.groups.filter(name=group_name).exists() or user.is_superuser
    return user_passes_test(in_group)

# Registration View
class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()

        # Optionally, add user to a group
        group = Group.objects.get(name='MyGroup')  # Replace with your group name
        user.groups.add(group)

        token, created = Token.objects.get_or_create(user=user)
        
        response_data = serializer.data
        response_data['token'] = token.key 
        
        return Response(response_data, status=201)

# Login View
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        
        if user is None:
            return Response({"error": "Invalid credentials"}, status=400)  # Handle invalid credentials
        
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            "message": "Logged in successfully",
            "user": user.username,
            "token": token.key
        })

# Logout View
@method_decorator(group_required('MyGroup'), name='dispatch')  # Use the custom decorator here
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer  # Added serializer class

    def post(self, request):
        request.user.auth_token.delete() 
        logout(request)  
        return Response({"message": "Logged out successfully"})