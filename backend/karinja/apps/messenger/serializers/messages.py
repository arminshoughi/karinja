from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.messenger.models import MessagesModel
from apps.messenger.services import MessageService
from apps.share.serializers import UserRegisterSerializer

from utils.serializers import DynamicFieldsModelSerializer

User = get_user_model()


class MessageBaseModelSerializer(DynamicFieldsModelSerializer):
    sender = UserRegisterSerializer(read_only=True)
    receiver = UserRegisterSerializer(read_only=True)
    receiver_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = MessagesModel
        service = MessageService
        fields = [
            "id",
            'sender',
            'receiver',
            'receiver_id',
            'body',
        ]


class MessageListModelSerialize(DynamicFieldsModelSerializer):
    sender = UserRegisterSerializer(read_only=True)

    class Meta:
        model = MessagesModel
        service = MessageService
        fields = [
            "id",
            'sender',
        ]
