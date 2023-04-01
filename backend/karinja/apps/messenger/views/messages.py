from django.contrib.auth import get_user_model
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.messenger.serializers import MessageBaseModelSerializer, MessageListModelSerialize
from apps.messenger.services import MessageService

User = get_user_model()


class MessageModelViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageBaseModelSerializer

    def get_queryset(self):
        return MessageService.messages(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = MessageService.get_inbox(user=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MessageListModelSerialize(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MessageListModelSerialize(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='(?P<sender_id>[^/.]+)/pv', )
    def pv(self, request, sender_id):
        person_1 = get_object_or_404(User, id=sender_id)
        queryset = MessageService.get_all_messages_from(person_1=person_1, person_2=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.validated_data['sender_id'] = self.request.user.id
        serializer.save()

    def perform_update(self, serializer):
        serializer.validated_data['sender_id'] = self.request.user.id
        serializer.save()
