# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.conf.urls import url, include
from rest_framework import routers

from easyauth import urls as auth_urls
from easyauth import admin_urls as user_admin_urls

from test import views

router = routers.DefaultRouter(trailing_slash=False)
# app apis
router.register(r'api/companies', views.CompanyViewSet, base_name='company')

urlpatterns = router.urls

urlpatterns += [
    # url(r'^admin/', admin.site.urls),
    # auth apis including login, password reset
    url(r'^api-auth/', include(auth_urls)),
    # user crud apis - only used by administrator
    url(r'^api/', include(user_admin_urls)),


    # url(r'^', include(rest_urls)),
    # url(r'^index/', index_view),
]

