package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/openf1-car-data-sdk/go"
	"github.com/voxgig-sdk/openf1-car-data-sdk/go/core"

	vs "github.com/voxgig-sdk/openf1-car-data-sdk/go/utility/struct"
)

func TestEndpointPathPostEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EndpointPathPost(nil)
		if ent == nil {
			t.Fatal("expected non-nil EndpointPathPostEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := endpoint_path_postBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "endpoint_path_post." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		endpointPathPostRef01Ent := client.EndpointPathPost(nil)
		endpointPathPostRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "endpoint_path_post"}, setup.data), "endpoint_path_post_ref01"))
		endpointPathPostRef01Data["path"] = setup.idmap["path01"]

		endpointPathPostRef01DataResult, err := endpointPathPostRef01Ent.Create(endpointPathPostRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		endpointPathPostRef01Data = core.ToMapAny(entityData(endpointPathPostRef01DataResult))
		if endpointPathPostRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if endpointPathPostRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		endpointPathPostRef01MatchDt0 := map[string]any{
			"id": endpointPathPostRef01Data["id"],
		}
		endpointPathPostRef01DataDt0Loaded, err := endpointPathPostRef01Ent.Load(endpointPathPostRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		endpointPathPostRef01DataDt0LoadResult := core.ToMapAny(entityData(endpointPathPostRef01DataDt0Loaded))
		if endpointPathPostRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if endpointPathPostRef01DataDt0LoadResult["id"] != endpointPathPostRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func endpoint_path_postBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "endpoint_path_post", "EndpointPathPostTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read endpoint_path_post test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse endpoint_path_post test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"endpoint_path_post01", "endpoint_path_post02", "endpoint_path_post03", "path01"},
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
	entidEnvRaw := os.Getenv("OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID": idmap,
		"OPENF1_CAR_DATA_TEST_LIVE":      "FALSE",
		"OPENF1_CAR_DATA_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENF1_CAR_DATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewOpenf1CarDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENF1_CAR_DATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENF1_CAR_DATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
