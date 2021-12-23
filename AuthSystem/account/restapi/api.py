from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import SignUpSerializer
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView


class SignUpAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SignUpSerializer

