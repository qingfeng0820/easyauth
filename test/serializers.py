# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from rest_framework import serializers

from test import models


class CompanySerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(many=True,
                                               queryset=models.Company.objects.all(),
                                               required=False)

    class Meta:
        model = models.Company
        depth = 1
