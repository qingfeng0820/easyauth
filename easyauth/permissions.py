# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.permissions import BasePermission, AllowAny, DjangoModelPermissions


class AuthenticatedChecker(object):
    @staticmethod
    def is_authenticated(request):
        return request.user and (request.user.is_authenticated() if callable(request.user.is_authenticated)
                                 else request.user.is_authenticated)


class IsSuperUser(BasePermission):
    """
    Allows access only to super users.
    """

    def has_permission(self, request, view):
        return AuthenticatedChecker.is_authenticated(request) and request.user.is_superuser


class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return AuthenticatedChecker.is_authenticated(request) and request.user.is_staff


class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return AuthenticatedChecker.is_authenticated(request)


class PermissionsAll(BasePermission):
    permission_classes = (IsAdminUser, )

    def has_permission(self, request, view):
        for permission in [permission() for permission in self.permission_classes]:
            if not permission.has_permission(request, view):
                return False
        return True


class PermissionsAny(BasePermission):
    permission_classes = (AllowAny, )

    def has_permission(self, request, view):
        for permission in [permission() for permission in self.permission_classes]:
            if permission.has_permission(request, view):
                return True
        return False


class UserAdminPermission(PermissionsAny):
    permission_classes = (IsSuperUser, IsAdminUser)


class DBBasedPermissionsAll(BasePermission):
    required_permission_names = []

    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            return False
        return request.user.has_perms(self.required_permission_names)


class DBBasedPermissionsAny(BasePermission):
    required_permission_names = []

    def has_permission(self, request, view):
        if not request.user.is_authenticated():
            return False
        for item in self.required_permission_names:
            if request.user.has_perm(item):
                return True
        return False


class DjangoModelPermissionsWithAuthenticated(PermissionsAll):
    permission_classes = (IsAuthenticated, DjangoModelPermissions)


class QueryUserModelPermission(DBBasedPermissionsAll):
    required_permission_names = "query_user"


class QueryGroupModelPermission(DBBasedPermissionsAll):
    required_permission_names = "query_group"


class QueryPermissionModelPermission(DBBasedPermissionsAll):
    required_permission_names = "query_permission"


class UserViewGetPermission(PermissionsAny):
    permission_classes = (UserAdminPermission, QueryUserModelPermission)


class GroupViewGetPermission(PermissionsAny):
    permission_classes = (UserAdminPermission, QueryGroupModelPermission)


class PermissionViewGetPermission(PermissionsAny):
    permission_classes = (UserAdminPermission, QueryPermissionModelPermission)
