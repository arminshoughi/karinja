from django.db.models import Q, Sum

from apps.messenger.models import MessagesModel
from utils.service import BaseService


class MessageService(BaseService):
    model = MessagesModel

    @classmethod
    def messages(cls, user):
        return cls.filter(Q(sender=user) | Q(receiver=user))

    @classmethod
    def get_inbox(cls, user):
        sender_ids = cls.messages(user=user) \
            .values('sender') \
            .order_by('sender') \
            .annotate(count=Sum('sender')) \
            .values_list('sender', flat=True)
        return cls.filter(id__in=sender_ids)

    @classmethod
    def get_all_messages_from(cls, person_1, person_2):
        return cls.filter(
            Q(Q(sender=person_1) & Q(receiver=person_2)) |
            Q(Q(sender=person_2) & Q(receiver=person_1))
        )
