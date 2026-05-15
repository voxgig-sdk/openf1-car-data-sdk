# EndpointPathPost entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from openf1cardata_sdk import Openf1CarDataSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestEndpointPathPostEntity:

    def test_should_create_instance(self):
        testsdk = Openf1CarDataSDK.test(None, None)
        ent = testsdk.EndpointPathPost(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _endpoint_path_post_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "endpoint_path_post." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set OPENF_CARDATA_TEST_ENDPOINT_PATH_POST_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        endpoint_path_post_ref01_ent = client.EndpointPathPost(None)
        endpoint_path_post_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.endpoint_path_post"), "endpoint_path_post_ref01"))
        endpoint_path_post_ref01_data["path"] = setup["idmap"]["path01"]

        endpoint_path_post_ref01_data_result, err = endpoint_path_post_ref01_ent.create(endpoint_path_post_ref01_data, None)
        assert err is None
        endpoint_path_post_ref01_data = helpers.to_map(endpoint_path_post_ref01_data_result)
        assert endpoint_path_post_ref01_data is not None

        # LOAD
        endpoint_path_post_ref01_match_dt0 = {}
        endpoint_path_post_ref01_data_dt0_loaded, err = endpoint_path_post_ref01_ent.load(endpoint_path_post_ref01_match_dt0, None)
        assert err is None
        assert endpoint_path_post_ref01_data_dt0_loaded is not None



def _endpoint_path_post_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/endpoint_path_post/EndpointPathPostTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = Openf1CarDataSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["endpoint_path_post01", "endpoint_path_post02", "endpoint_path_post03", "path01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "OPENF_CARDATA_TEST_ENDPOINT_PATH_POST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "OPENF_CARDATA_TEST_ENDPOINT_PATH_POST_ENTID": idmap,
        "OPENF_CARDATA_TEST_LIVE": "FALSE",
        "OPENF_CARDATA_TEST_EXPLAIN": "FALSE",
        "OPENF_CARDATA_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("OPENF_CARDATA_TEST_ENDPOINT_PATH_POST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("OPENF_CARDATA_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("OPENF_CARDATA_APIKEY"),
            },
            extra or {},
        ])
        client = Openf1CarDataSDK(helpers.to_map(merged_opts))

    _live = env.get("OPENF_CARDATA_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("OPENF_CARDATA_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
