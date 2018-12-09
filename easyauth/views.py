# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import re

from django.contrib.auth import get_user_model
from django.contrib.auth import (login as django_login, logout as django_logout)
from django.contrib.auth.models import Group, Permission
from rest_framework import viewsets, status
from rest_framework.exceptions import APIException
from rest_framework.generics import CreateAPIView, GenericAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import exception_handler as rest_framework_exception_handler

from easyauth import conf
from easyauth.permissions import UserAdminPermission, IsSuperUser, IsAuthenticated
from easyauth.serializers import UserSerializer, UserRegisterSerializer, UserLoginSerializer, \
    UserPasswordResetSerializer, UserDetailSerializer, UserLogoutSerializer, AdminResetUserPasswordSerializer, \
    GroupSerializer, PermissionSerializer


import logging


logger = logging.getLogger(__name__)


class QueryLowPermAdminModelViewSet(viewsets.ModelViewSet):
    maintain_permission_classes = (IsSuperUser, )
    query_permission_classes = (IsAuthenticated, )

    def dispatch(self, request, *args, **kwargs):
        self.is_query_permission = False
        if request.method.lower() == "get":
            self.is_query_permission = True
        return super(viewsets.ModelViewSet, self).dispatch(request, *args, **kwargs)

    def get_permissions(self):
        self.permission_classes = self.maintain_permission_classes
        if hasattr(self, 'is_query_permission') and self.is_query_permission:
            self.permission_classes = self.query_permission_classes
        return super(viewsets.ModelViewSet, self).get_permissions()


class GroupViewSet(QueryLowPermAdminModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class PermissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = (IsAuthenticated,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserAdminPermission, )

    filter_fields = ('id', get_user_model().USERNAME_FIELD, 'first_name', 'last_name', 'is_active', 'is_staff',
                     'date_joined', 'last_login')
    ordering_fields = ('id', get_user_model().USERNAME_FIELD, 'first_name', 'last_name', 'is_active', 'is_staff',
                       'date_joined', 'last_login')

    def dispatch(self, request, *args, **kwargs):
        self.depart = None
        user_model = get_user_model()
        if user_model.USER_DEPART_FIELD is not None and request.user.is_authenticated() and not request.user.is_superuser:
            self.depart = getattr(request.user, user_model.USER_DEPART_FIELD)

        return super(viewsets.ModelViewSet, self).dispatch(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if hasattr(self, 'depart') and self.depart is not None:
            user_model = get_user_model()
            depart_id = self.depart.id
            request.data[user_model.USER_DEPART_FIELD] = depart_id
        return super(viewsets.ModelViewSet, self).create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if hasattr(self, 'depart') and self.depart is not None:
            user_model = get_user_model()
            depart_id = self.depart.id
            request.data[user_model.USER_DEPART_FIELD] = depart_id
        logger.info("Update user -> %s" % json.dumps(request.data))
        return super(viewsets.ModelViewSet, self).update(request, *args, **kwargs)

    def get_queryset(self):
        user_model = get_user_model()
        self.queryset = user_model.objects.all()
        if hasattr(self, 'depart') and self.depart is not None:
            filter_prop = {user_model.USER_DEPART_FIELD: self.depart}
            self.queryset = user_model.objects.filter(**filter_prop)
        return super(viewsets.ModelViewSet, self).get_queryset()


class AdminResetUsePwdView(GenericAPIView):
    queryset = get_user_model().objects.filter(is_active=True)
    serializer_class = AdminResetUserPasswordSerializer
    permission_classes = (UserAdminPermission,)
    __url_re = re.compile(r".*\/users\/(\d+)\/reset\/password.*")

    def post(self, request, *args, **kwargs):
        match_args = self.__url_re.search(request.path).groups()
        if len(match_args) == 1:
            self.kwargs['pk'] = long(match_args[0])
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # Return the success message with OK HTTP status
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserMeView(UpdateAPIView):
    queryset = get_user_model().objects.filter(is_active=True)
    serializer_class = UserDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        data = self.serializer_class(request.user).data
        return Response(data)

    def put(self, request, *args, **kwargs):
        logger.info("Self update -> %s" % json.dumps(request.data))
        self.kwargs['pk'] = request.user.id
        res = self.update(request, *args, **kwargs)
        return res

    def patch(self, request, *args, **kwargs):
        logger.info("Self partially update -> %s" % request.data)
        self.kwargs['pk'] = request.user.id
        res = self.partial_update(request, *args, **kwargs)
        return res


class RegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = (AllowAny,)


class PasswordResetView(GenericAPIView):
    queryset = get_user_model().objects.filter(is_active=True)
    serializer_class = UserPasswordResetSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        self.kwargs['pk'] = request.user.id
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return the success message with OK HTTP status
        return Response(status=status.HTTP_200_OK)


class LoginView(GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def login(self, request, user):
        django_login(request, user)
        return Response(status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        logger.info("Try to login -> %s: %s" % (get_user_model().USERNAME_FIELD,
                                               request.data.get(get_user_model().USERNAME_FIELD)))
        serializer = self.get_serializer(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        res = self.login(request, serializer.authencated_user)
        return res


class LogoutView(GenericAPIView):
    queryset = get_user_model().objects.filter(is_active=True)
    serializer_class = UserLogoutSerializer
    permission_classes = (IsAuthenticated,)

    def logout(self, request):
        self.kwargs['pk'] = request.user.id
        django_logout(request)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        logger.info("Logout successfully")
        return Response(status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        return self.logout(request)

    def get(self, request, *args, **kwargs):
        if conf.get_conf(conf.ACCOUNT_LOGOUT_ON_GET):
            response = self.logout(request)
        else:
            response = self.http_method_not_allowed(request, *args, **kwargs)
        return self.finalize_response(request, response, *args, **kwargs)


def exception_handler(exc, context):
    if isinstance(exc, APIException):
        msg = json.dumps(exc.detail, encoding="UTF-8", ensure_ascii=False)
        logger.error("Get Error %s: %s", exc.__class__, msg)
    else:
        logger.error("Get Error %s: %s", exc.__class__, exc)
    return rest_framework_exception_handler(exc, context)


