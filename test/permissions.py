# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from easyauth.permissions import DBBasedPermissionsAll


class DummyModelMaintainPermission(DBBasedPermissionsAll):
    required_permission_names = ["test.maintain_dummy_model", ]
