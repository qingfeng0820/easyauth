# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import viewsets

from easyauth.permissions import IsSuperUser
from test import models, serializers


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer
    permission_classes = (IsSuperUser,)
