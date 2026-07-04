# Openf1CarData Golang SDK



The Golang SDK for the Openf1CarData API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/openf1-car-data-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/openf1-car-data-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/openf1-car-data-sdk/go=../openf1-car-data-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/openf1-car-data-sdk/go"
)

func main() {
    client := sdk.New()

    // Create a createcheckoutsession.
    created, err := client.CreateCheckoutSession(nil).Create(map[string]any{"name": "Example"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

createcheckoutsession, err := client.CreateCheckoutSession(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(createcheckoutsession) // the loaded mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenf1CarDataSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENF1_CAR_DATA_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewOpenf1CarDataSDK

```go
func NewOpenf1CarDataSDK(options map[string]any) *Openf1CarDataSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *Openf1CarDataSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### Openf1CarDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CreateCheckoutSession` | `(data map[string]any) Openf1CarDataEntity` | Create a CreateCheckoutSession entity instance. |
| `EndpointPathPost` | `(data map[string]any) Openf1CarDataEntity` | Create an EndpointPathPost entity instance. |
| `RaceLap` | `(data map[string]any) Openf1CarDataEntity` | Create a RaceLap entity instance. |
| `SubscriptionCancel` | `(data map[string]any) Openf1CarDataEntity` | Create a SubscriptionCancel entity instance. |
| `SubscriptionSuccess` | `(data map[string]any) Openf1CarDataEntity` | Create a SubscriptionSuccess entity instance. |
| `Token` | `(data map[string]any) Openf1CarDataEntity` | Create a Token entity instance. |
| `Webhook` | `(data map[string]any) Openf1CarDataEntity` | Create a Webhook entity instance. |

### Entity interface (Openf1CarDataEntity)

All entities implement the `Openf1CarDataEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    createcheckoutsession, err := client.CreateCheckoutSession(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // createcheckoutsession is the loaded record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CreateCheckoutSession

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/stripe/create-checkout-session`

#### EndpointPathPost

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/{path}`

#### RaceLap

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/race_lap`

#### SubscriptionCancel

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/subscription_cancel`

#### SubscriptionSuccess

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/subscription_success`

#### Token

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/token`

#### Webhook

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/stripe/webhook`



## Entities


### CreateCheckoutSession

Create an instance: `create_checkout_session := client.CreateCheckoutSession(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.CreateCheckoutSession(nil).Create(map[string]any{
}, nil)
```


### EndpointPathPost

Create an instance: `endpoint_path_post := client.EndpointPathPost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
endpoint_path_post, err := client.EndpointPathPost(nil).Load(map[string]any{"id": "endpoint_path_post_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(endpoint_path_post) // the loaded record
```

#### Example: Create

```go
result, err := client.EndpointPathPost(nil).Create(map[string]any{
}, nil)
```


### RaceLap

Create an instance: `race_lap := client.RaceLap(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
race_lap, err := client.RaceLap(nil).Load(map[string]any{"id": "race_lap_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(race_lap) // the loaded record
```

#### Example: Create

```go
result, err := client.RaceLap(nil).Create(map[string]any{
}, nil)
```


### SubscriptionCancel

Create an instance: `subscription_cancel := client.SubscriptionCancel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
subscription_cancel, err := client.SubscriptionCancel(nil).Load(map[string]any{"id": "subscription_cancel_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscription_cancel) // the loaded record
```


### SubscriptionSuccess

Create an instance: `subscription_success := client.SubscriptionSuccess(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
subscription_success, err := client.SubscriptionSuccess(nil).Load(map[string]any{"id": "subscription_success_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscription_success) // the loaded record
```


### Token

Create an instance: `token := client.Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Token(nil).Create(map[string]any{
}, nil)
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Webhook(nil).Create(map[string]any{
}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/openf1-car-data-sdk/go/
├── openf1-car-data.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/openf1-car-data-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
createcheckoutsession := client.CreateCheckoutSession(nil)
createcheckoutsession.Load(map[string]any{"id": "example_id"}, nil)

// createcheckoutsession.Data() now returns the loaded createcheckoutsession data
// createcheckoutsession.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
