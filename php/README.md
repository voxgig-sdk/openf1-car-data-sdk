# Openf1CarData PHP SDK



The PHP SDK for the Openf1CarData API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openf1-car-data-sdk/releases](https://github.com/voxgig-sdk/openf1-car-data-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openf1cardata_sdk.php';

$client = new Openf1CarDataSDK();
```

### 4. Create, update, and remove

```php
// create() returns the bare created CreateCheckoutSession record.
$created = $client->CreateCheckoutSession()->create(["name" => "Example"]);

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = Openf1CarDataSDK::test([
    "entity" => ["createcheckoutsession" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$createcheckoutsession = $client->CreateCheckoutSession()->load(["id" => "test01"]);
print_r($createcheckoutsession);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new Openf1CarDataSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENF1_CAR_DATA_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### Openf1CarDataSDK

```php
require_once 'openf1cardata_sdk.php';
$client = new Openf1CarDataSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = Openf1CarDataSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### Openf1CarDataSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CreateCheckoutSession` | `($data): CreateCheckoutSessionEntity` | Create a CreateCheckoutSession entity instance. |
| `EndpointPathPost` | `($data): EndpointPathPostEntity` | Create an EndpointPathPost entity instance. |
| `RaceLap` | `($data): RaceLapEntity` | Create a RaceLap entity instance. |
| `SubscriptionCancel` | `($data): SubscriptionCancelEntity` | Create a SubscriptionCancel entity instance. |
| `SubscriptionSuccess` | `($data): SubscriptionSuccessEntity` | Create a SubscriptionSuccess entity instance. |
| `Token` | `($data): TokenEntity` | Create a Token entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$create_checkout_session = $client->CreateCheckoutSession();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$create_checkout_session = $client->CreateCheckoutSession()->create([
]);
```


### EndpointPathPost

Create an instance: `$endpoint_path_post = $client->EndpointPathPost();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare EndpointPathPost record (throws on error).
$endpoint_path_post = $client->EndpointPathPost()->load(["id" => "endpoint_path_post_id"]);
```

#### Example: Create

```php
$endpoint_path_post = $client->EndpointPathPost()->create([
]);
```


### RaceLap

Create an instance: `$race_lap = $client->RaceLap();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare RaceLap record (throws on error).
$race_lap = $client->RaceLap()->load(["id" => "race_lap_id"]);
```

#### Example: Create

```php
$race_lap = $client->RaceLap()->create([
]);
```


### SubscriptionCancel

Create an instance: `$subscription_cancel = $client->SubscriptionCancel();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare SubscriptionCancel record (throws on error).
$subscription_cancel = $client->SubscriptionCancel()->load(["id" => "subscription_cancel_id"]);
```


### SubscriptionSuccess

Create an instance: `$subscription_success = $client->SubscriptionSuccess();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare SubscriptionSuccess record (throws on error).
$subscription_success = $client->SubscriptionSuccess()->load(["id" => "subscription_success_id"]);
```


### Token

Create an instance: `$token = $client->Token();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$token = $client->Token()->create([
]);
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$webhook = $client->Webhook()->create([
]);
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openf1cardata_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openf1cardata_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$createcheckoutsession = $client->CreateCheckoutSession();
$createcheckoutsession->load(["id" => "example_id"]);

// $createcheckoutsession->dataGet() now returns the loaded createcheckoutsession data
// $createcheckoutsession->matchGet() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
