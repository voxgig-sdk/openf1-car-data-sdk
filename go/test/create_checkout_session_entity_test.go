package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openf1-car-data-sdk"
	"github.com/voxgig-sdk/openf1-car-data-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestCreateCheckoutSessionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CreateCheckoutSession(nil)
		if ent == nil {
			t.Fatal("expected non-nil CreateCheckoutSessionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := create_checkout_sessionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "create_checkout_session." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		createCheckoutSessionRef01Ent := client.CreateCheckoutSession(nil)
		createCheckoutSessionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "create_checkout_session"}, setup.data), "create_checkout_session_ref01"))

		createCheckoutSessionRef01DataResult, err := createCheckoutSessionRef01Ent.Create(createCheckoutSessionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		createCheckoutSessionRef01Data = core.ToMapAny(createCheckoutSessionRef01DataResult)
		if createCheckoutSessionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func create_checkout_sessionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "create_checkout_session", "CreateCheckoutSessionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read create_checkout_session test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse create_checkout_session test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"create_checkout_session01", "create_checkout_session02", "create_checkout_session03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID": idmap,
		"OPENF_CARDATA_TEST_LIVE":      "FALSE",
		"OPENF_CARDATA_TEST_EXPLAIN":   "FALSE",
		"OPENF_CARDATA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENF_CARDATA_TEST_CREATE_CHECKOUT_SESSION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENF_CARDATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENF_CARDATA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOpenf1CarDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENF_CARDATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENF_CARDATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
