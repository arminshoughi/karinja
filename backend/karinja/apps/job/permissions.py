from rest_framework.permissions import BasePermission

from apps.share.consts.users import UserTypeChoices


class IsCompany(BasePermission):
    """
    Allows access only to Company users.
    """

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.typ == UserTypeChoices.COMPANY.value
        )


class IsEmployee(BasePermission):
    """
    Allows access only to Employee users.
    """

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.typ == UserTypeChoices.EMPLOYEE.value
        )
