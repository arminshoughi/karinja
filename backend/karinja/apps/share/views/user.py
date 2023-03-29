from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.share.consts import UserTypeChoices
from apps.share.serializers import UserRegisterSerializer, EmployeeSerializer, CompanySerializer, UserBaseSerializer

User = get_user_model()


class ProfileViewSet(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    serializer_class = UserBaseSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer(self, *args, **kwargs):
        user = self.request.user
        if not user.is_authenticated:
            serializer_class = UserRegisterSerializer
        elif user.typ == UserTypeChoices.EMPLOYEE:
            serializer_class = EmployeeSerializer
        else:
            serializer_class = CompanySerializer

        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)


class UserRegisterViewSet(CreateAPIView):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.pop('username')
        password = serializer.validated_data.pop('password')
        user = User.objects.create_user(username=username, password=password)
        for item in serializer.validated_data:
            setattr(user, item, serializer.validated_data[item])
        user.save()
        refresh_token = RefreshToken.for_user(user)
        context = {
            'refresh': str(refresh_token),
            'access': str(refresh_token.access_token)
        }
        return Response(data=context, status=status.HTTP_200_OK)
