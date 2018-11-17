import unittest

from easyauth import conf


class ConfTest(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_get_conf(self):
        v = conf.get_conf(conf.USER_DEFAULT_PWD_MAINTAIN_BY_ADMIN)
        self.assertEqual("123456", v)
