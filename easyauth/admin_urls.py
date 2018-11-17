# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url
from rest_framework import routers

from easyauth import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'users', views.UserViewSet, base_name='easyauth_user_admin')

urlpatterns = router.urls + [
    url(r'^users/(\d+)/reset/password', views.AdminResetUsePwdView.as_view(), name='easyauth_user-admin-resetpwd'),
]


