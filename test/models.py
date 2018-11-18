# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from easyauth.models import AbstractUser


class Company(models.Model):
    name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=False)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id', )


class User(AbstractUser):
    company = models.ForeignKey(Company, related_name='users', null=True)
    USER_DEPART_FIELD = "company"


class DummyModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        permissions = (
            ("maintain_dummy_model", "Can maintain dummy model"),
        )
        ordering = ('id', )


class Dummy2Model(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('id', )
