-- EndpointPathPost entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("openf1-car-data_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("EndpointPathPostEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:EndpointPathPost(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = endpoint_path_post_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "endpoint_path_post." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local endpoint_path_post_ref01_ent = client:EndpointPathPost(nil)
    local endpoint_path_post_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.endpoint_path_post"), "endpoint_path_post_ref01"))
    endpoint_path_post_ref01_data["path"] = setup.idmap["path01"]

    local endpoint_path_post_ref01_data_result, err = endpoint_path_post_ref01_ent:create(endpoint_path_post_ref01_data, nil)
    assert.is_nil(err)
    endpoint_path_post_ref01_data = helpers.to_map(type(endpoint_path_post_ref01_data_result) == 'table' and endpoint_path_post_ref01_data_result.data_get and endpoint_path_post_ref01_data_result:data_get() or endpoint_path_post_ref01_data_result)
    assert.is_not_nil(endpoint_path_post_ref01_data)

    -- LOAD
    local endpoint_path_post_ref01_match_dt0 = {}
    local endpoint_path_post_ref01_data_dt0_loaded, err = endpoint_path_post_ref01_ent:load(endpoint_path_post_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(endpoint_path_post_ref01_data_dt0_loaded)

  end)
end)

function endpoint_path_post_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/endpoint_path_post/EndpointPathPostTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read endpoint_path_post test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "endpoint_path_post01", "endpoint_path_post02", "endpoint_path_post03", "path01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID"] = idmap,
    ["OPENF1_CAR_DATA_TEST_LIVE"] = "FALSE",
    ["OPENF1_CAR_DATA_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["OPENF1_CAR_DATA_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["OPENF1_CAR_DATA_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["OPENF1_CAR_DATA_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
