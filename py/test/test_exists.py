# ProjectName SDK exists test

import pytest
from openf1cardata_sdk import Openf1CarDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Openf1CarDataSDK.test(None, None)
        assert testsdk is not None
