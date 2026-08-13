# Openf1CarData SDK feature factory

from openf1cardata_sdk.feature.base_feature import Openf1CarDataBaseFeature
from openf1cardata_sdk.feature.test_feature import Openf1CarDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Openf1CarDataBaseFeature(),
        "test": lambda: Openf1CarDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
