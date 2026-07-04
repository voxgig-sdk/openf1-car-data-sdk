# CreateCheckoutSession entity test

require "minitest/autorun"
require "json"
require_relative "../Openf1CarData_sdk"
require_relative "runner"

class CreateCheckoutSessionEntityTest < Minitest::Test
  def test_create_instance
    testsdk = Openf1CarDataSDK.test(nil, nil)
    ent = testsdk.CreateCheckoutSession(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = create_checkout_session_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "create_checkout_session." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    create_checkout_session_ref01_ent = client.CreateCheckoutSession(nil)
    create_checkout_session_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.create_checkout_session"), "create_checkout_session_ref01"))

    create_checkout_session_ref01_data_result = create_checkout_session_ref01_ent.create(create_checkout_session_ref01_data, nil)
    create_checkout_session_ref01_data = Helpers.to_map(create_checkout_session_ref01_data_result)
    assert !create_checkout_session_ref01_data.nil?

  end
end

def create_checkout_session_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "create_checkout_session", "CreateCheckoutSessionTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = Openf1CarDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["create_checkout_session01", "create_checkout_session02", "create_checkout_session03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID" => idmap,
    "OPENF_CARDATA_TEST_LIVE" => "FALSE",
    "OPENF_CARDATA_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["OPENF_CARDATA_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = Openf1CarDataSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["OPENF_CARDATA_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["OPENF_CARDATA_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
