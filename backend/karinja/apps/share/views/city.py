from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.share.serializers import CityBaseModelSerializer
from apps.share.services import CityService


class CityList(generics.ListAPIView):
    serializer_class = CityBaseModelSerializer
    queryset = CityService.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CityService.filter(state_id=self.kwargs.get('state_id', 0))
