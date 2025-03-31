from django.contrib.auth.models import Group
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.authtoken.models import Token as AuthToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate, logout
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password
from .models import CustomUser
from rest_framework.authtoken.models import Token
from .serializers import (
    RegisterSerializer, LoginSerializer, LogoutSerializer, 
    ProfileSerializer, CustomUserSerializer, TokenSerializer
)
from datetime import timezone, timedelta
import hashlib
import uuid

# Email template constants
SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:5173"

def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""

# Registration View
class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.save()
        try:
            group = Group.objects.get(name='Students')
            user.groups.add(group)
        except Group.DoesNotExist:
            pass
        
        token, _ = AuthToken.objects.get_or_create(user=user)
        
        return Response({
            "success": True,
            "message": "You are now registered!",
            "user_id": user.id,
            "email": user.email,
            "role": user.role,
            "student_number": user.student_number if user.role == 'STUDENT' else None,
            "token": token.key
        }, status=status.HTTP_201_CREATED)

# Login View
class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def get(self, request):
        return Response({"detail": "Please log in via POST or use /admin/login/ for admin"})

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            request,
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        
        if user:
            token, _ = AuthToken.objects.get_or_create(user=user)
            return Response({
                "success": True,
                "message": "Logged in successfully",
                "email": user.email,
                "role": user.role,
                "student_number": user.student_number if user.role == 'STUDENT' else None,
                "token": token.key
            }, status=status.HTTP_200_OK)
        return Response(
            {"success": False, "message": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )

# Logout View (Using Custom Permission Class)
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    

class HomeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"detail": "Welcome to your home page", "email": request.user.email})    

# Forgot Password View
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        email = request.data.get("email")
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response(
                {"success": False, "message": "Email not found!"},
                status=status.HTTP_404_NOT_FOUND,
            )

        created_at = timezone.now()
        expires_at = created_at + timedelta(days=1)
        salt = uuid.uuid4().hex
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode("utf-8")
        ).hexdigest()

        token_obj = {
            "token": token,
            "created_at": created_at,
            "expires_at": expires_at,
            "user": user,
        }
        serializer = TokenSerializer(data=token_obj)
        if serializer.is_valid():
            serializer.save()
            subject = "Forgot Password Link"
            content = mail_template(
                "We have received a request to reset your password. Please reset your password using the link below.",
                f"{URL}/resetPassword?id={user.id}&token={token}",
                "Reset Password",
            )
            send_mail(
                subject=subject,
                message="",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                html_message=content,
            )
            return Response(
                {"success": True, "message": "A password reset link has been sent to your email."},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"success": False, "message": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

# Reset Password View
class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        user_id = request.data.get("id")
        token = request.data.get("token")
        password = request.data.get("password")

        token_obj = Token.objects.filter(user_id=user_id).order_by("-created_at").first()
        if not token_obj or token_obj.expires_at < timezone.now():
            return Response(
                {"success": False, "message": "Password reset link has expired!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        elif token != token_obj.token or token_obj.is_used:
            return Response(
                {"success": False, "message": "Reset password link is invalid!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token_obj.is_used = True
        hashed_password = make_password(password)
        ret_code = CustomUser.objects.filter(id=user_id).update(password=hashed_password)
        if ret_code:
            token_obj.save()
            return Response(
                {"success": True, "message": "Your password reset was successful!"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"success": False, "message": "Failed to reset password."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

# Profile View
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "id": instance.id,
            "email": instance.email,
            "role": instance.role,
            "student_number": instance.student_number if instance.role == 'STUDENT' else None,
            "message": "Profile updated successfully"
        }, status=status.HTTP_200_OK)

# CustomUser ViewSet
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]