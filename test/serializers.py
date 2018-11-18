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


class DummyModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.DummyModel
        fields = '__all__'
        depth = 1


class Dummy2ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Dummy2Model
        fields = '__all__'
        depth = 1
