# SubscriptionSuccess entity test

require "minitest/autorun"
require "json"
require_relative "../Openf1CarData_sdk"
require_relative "runner"

class SubscriptionSuccessEntityTest < Minitest::Test
  def test_create_instance
    testsdk = Openf1CarDataSDK.test(nil, nil)
    ent = testsdk.SubscriptionSuccess(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = subscription_success_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "subscription_success." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    subscription_success_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.subscription_success")))
    subscription_success_ref01_data = nil
    if subscription_success_ref01_data_raw.length > 0
      subscription_success_ref01_data = Helpers.to_map(subscription_success_ref01_data_raw[0][1])
    end

    # LOAD
    subscription_success_ref01_ent = client.SubscriptionSuccess(nil)
    subscription_success_ref01_match_dt0 = {}
    subscription_success_ref01_data_dt0_loaded, err = subscription_success_ref01_ent.load(subscription_success_ref01_match_dt0, nil)
    assert_nil err
    assert !subscription_success_ref01_data_dt0_loaded.nil?

  end
end

def subscription_success_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "subscription_success", "SubscriptionSuccessTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = Openf1CarDataSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["subscription_success01", "subscription_success02", "subscription_success03"],
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
  entid_env_raw = ENV["OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID" => idmap,
    "OPENF_CARDATA_TEST_LIVE" => "FALSE",
    "OPENF_CARDATA_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID"])
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
