from utils.serializers import DynamicFieldsModelSerializer
from .. import services
from ..models import StateModel


class StateBaseModelSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = StateModel
        service = services.StateService
        fields = [
            "id",
            'title',
        ]
