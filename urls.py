# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url, include
from django.contrib import admin

from easyauth import urls as auth_urls
from easyauth import admin_urls as user_admin_urls

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    # auth apis including login, password reset
    url(r'^api-auth/', include(auth_urls)),
    # user crud apis - only used by administrator
    url(r'^api/', include(user_admin_urls)),

    # # main apis
    # url(r'^', include(rest_urls)),
    # url(r'^index/', index_view),
]
