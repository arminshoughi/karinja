from django.db import models
from django.utils.translation import gettext_lazy as _


class CooperationTypeChoices(models.IntegerChoices):
    FULL_TIME = 0, _('Full Time')
    PART_TIME = 1, _('Part Time')
    REMOTE = 2, _('Remote')


class MilitaryStatusTypeChoices(models.IntegerChoices):
    INCLUDED = 0, _('Included')
    DONE = 1, _('Done')
    EXEMPT = 2, _('Exempt')
    NO_MATTER = 3, _('No Matter')


class ApplicationStatusTypeChoices(models.IntegerChoices):
    INITIAL = 0, _('Initial')
    PENDING = 1, _('Pending')
    ACCEPT = 2, _('Accept')
    REJECT = 3, _('Reject')
