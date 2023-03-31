from utils.serializers import DynamicFieldsModelSerializer
from . import StateBaseModelSerializer
from .. import services
from ..models import CityModel


class CityBaseModelSerializer(DynamicFieldsModelSerializer):
    state = StateBaseModelSerializer(read_only=True)
    state_id = StateBaseModelSerializer(write_only=True)

    class Meta:
        model = CityModel
        service = services.CityService
        fields = [
            "id",
            'state_id',
            'state',
            'title',
        ]
