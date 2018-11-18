# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from easyauth.permissions import IsSuperUser, DjangoModelPermissionsWithAuthenticated
from easyauth.views import QueryLowPermAdminModelViewSet
from test import models, serializers
from test.permissions import DummyModelMaintainPermission


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer
    permission_classes = (IsSuperUser,)


class DummyModelViewSet(QueryLowPermAdminModelViewSet):
    queryset = models.DummyModel.objects.all()
    serializer_class = serializers.DummyModelSerializer
    maintain_permission_classes = (DummyModelMaintainPermission, )
    query_permission_classes = (IsAuthenticated, )


class Dummy2ModelViewSet(viewsets.ModelViewSet):
    queryset = models.Dummy2Model.objects.all()
    serializer_class = serializers.Dummy2ModelSerializer
    permission_classes = (DjangoModelPermissionsWithAuthenticated, )
