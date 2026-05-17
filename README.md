# Openf1CarData SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CreateCheckoutSession** |  | `/stripe/create-checkout-session` |
| **EndpointPathPost** |  | `/{path}` |
| **RaceLap** |  | `/race_lap` |
| **SubscriptionCancel** |  | `/subscription_cancel` |
| **SubscriptionSuccess** |  | `/subscription_success` |
| **Token** |  | `/token` |
| **Webhook** |  | `/stripe/webhook` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/openf1-car-data-sdk/go"

client := sdk.NewOpenf1CarDataSDK(map[string]any{
    "apikey": os.Getenv("OPENF1-CAR-DATA_APIKEY"),
})

```

### Lua

```lua
local sdk = require("openf1-car-data_sdk")

local client = sdk.new({
  apikey = os.getenv("OPENF1-CAR-DATA_APIKEY"),
})

```

### PHP

```php
<?php
require_once 'openf1cardata_sdk.php';

$client = new Openf1CarDataSDK([
    "apikey" => getenv("OPENF1-CAR-DATA_APIKEY"),
]);

```

### Python

```python
import os
from openf1cardata_sdk import Openf1CarDataSDK

client = Openf1CarDataSDK({
    "apikey": os.environ.get("OPENF1-CAR-DATA_APIKEY"),
})

```

### Ruby

```ruby
require_relative "Openf1CarData_sdk"

client = Openf1CarDataSDK.new({
  "apikey" => ENV["OPENF1-CAR-DATA_APIKEY"],
})

```

### TypeScript

```ts
import { Openf1CarDataSDK } from 'openf1-car-data'

const client = new Openf1CarDataSDK({
  apikey: process.env.OPENF1-CAR-DATA_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CreateCheckoutSession(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CreateCheckoutSession(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = Openf1CarDataSDK::test(null, null);
[$result, $err] = $client->CreateCheckoutSession(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = Openf1CarDataSDK.test(None, None)
result, err = client.CreateCheckoutSession(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = Openf1CarDataSDK.test(nil, nil)
result, err = client.CreateCheckoutSession(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = Openf1CarDataSDK.test()
const result = await client.CreateCheckoutSession().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

