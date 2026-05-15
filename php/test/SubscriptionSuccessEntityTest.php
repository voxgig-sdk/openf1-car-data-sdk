<?php
declare(strict_types=1);

// SubscriptionSuccess entity test

require_once __DIR__ . '/../openf1cardata_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SubscriptionSuccessEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = Openf1CarDataSDK::test(null, null);
        $ent = $testsdk->SubscriptionSuccess(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = subscription_success_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "subscription_success." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $subscription_success_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.subscription_success")));
        $subscription_success_ref01_data = null;
        if (count($subscription_success_ref01_data_raw) > 0) {
            $subscription_success_ref01_data = Helpers::to_map($subscription_success_ref01_data_raw[0][1]);
        }

        // LOAD
        $subscription_success_ref01_ent = $client->SubscriptionSuccess(null);
        $subscription_success_ref01_match_dt0 = [];
        [$subscription_success_ref01_data_dt0_loaded, $err] = $subscription_success_ref01_ent->load($subscription_success_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($subscription_success_ref01_data_dt0_loaded);

    }
}

function subscription_success_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/subscription_success/SubscriptionSuccessTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = Openf1CarDataSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["subscription_success01", "subscription_success02", "subscription_success03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID" => $idmap,
        "OPENF_CARDATA_TEST_LIVE" => "FALSE",
        "OPENF_CARDATA_TEST_EXPLAIN" => "FALSE",
        "OPENF_CARDATA_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["OPENF_CARDATA_TEST_SUBSCRIPTION_SUCCESS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["OPENF_CARDATA_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["OPENF_CARDATA_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new Openf1CarDataSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["OPENF_CARDATA_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["OPENF_CARDATA_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
