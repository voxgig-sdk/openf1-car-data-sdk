# Openf1CarData SDK feature factory

from openf1cardata_sdk.feature.base_feature import Openf1CarDataBaseFeature
from openf1cardata_sdk.feature.ratelimit_feature import Openf1CarDataRatelimitFeature
from openf1cardata_sdk.feature.retry_feature import Openf1CarDataRetryFeature
from openf1cardata_sdk.feature.test_feature import Openf1CarDataTestFeature
from openf1cardata_sdk.feature.timeout_feature import Openf1CarDataTimeoutFeature


_FEATURES = {
    "base": lambda: Openf1CarDataBaseFeature(),
    "ratelimit": lambda: Openf1CarDataRatelimitFeature(),
    "retry": lambda: Openf1CarDataRetryFeature(),
    "test": lambda: Openf1CarDataTestFeature(),
    "timeout": lambda: Openf1CarDataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
