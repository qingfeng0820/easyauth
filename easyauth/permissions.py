# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.permissions import BasePermission, AllowAny


class IsSuperUser(BasePermission):
    """
    Allows access only to super users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated() and request.user.is_superuser


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated() and request.user.is_staff


class PermissionsAll(BasePermission):
    permission_classes = (IsAdminUser, )

    def has_permission(self, request, view):
        for permission in [permission() for permission in self.permission_classes]:
            if not permission.has_permission(request, self):
                return False
        return True


class PermissionsAny(BasePermission):
    permission_classes = (AllowAny, )

    def has_permission(self, request, view):
        for permission in [permission() for permission in self.permission_classes]:
            if permission.has_permission(request, self):
                return True
        return False


class UserAdminPermission(PermissionsAny):
    permission_classes = (IsSuperUser, IsAdminUser)


class DBBasedPermissionsAll(BasePermission):
    required_permission_names = []

    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            return False
        if not self.required_permission_names and \
                not request.user.has_perm(self.required_permission_names):
            return False
        return True


class DBBasedPermissionsAny(BasePermission):
    required_permission_names = []

    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            return False
        if not self.required_permission_names:
            for item in self.required_permission_names:
                if request.user.has_perm(item):
                    return True
        return False
