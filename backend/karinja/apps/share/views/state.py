from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.share.serializers import StateBaseModelSerializer
from apps.share.services import StateService


class StateList(generics.ListAPIView):
    serializer_class = StateBaseModelSerializer
    queryset = StateService.all()
    permission_classes = [IsAuthenticated]
