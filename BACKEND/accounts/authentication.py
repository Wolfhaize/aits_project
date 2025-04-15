# authentication.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Token
from django.utils import timezone

class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            prefix, token = auth_header.split()
            if prefix.lower() != 'token':
                return None
        except ValueError:
            return None

        try:
            token_obj = Token.objects.get(
                token=token,
                is_used=False,
                expires_at__gt=timezone.now()
            )
            return (token_obj.user, None)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')