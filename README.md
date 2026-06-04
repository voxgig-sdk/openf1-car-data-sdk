# Openf1CarData SDK

Open-source REST API for live and historical Formula 1 telemetry, timing, and session data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About FastAPI

[OpenF1](https://openf1.org/) is an open-source REST API that aggregates Formula 1 race data — car telemetry, timing, positions, weather, race control messages and team radio — and exposes it through a single JSON HTTP interface. It is a community-operated project maintained by independent contributors and is not affiliated with Formula 1, the FIA, or FOM.

What you get from the API:

- Car telemetry sampled at roughly 3.7 Hz (speed, throttle, brake, RPM, gear, DRS).
- Lap and sector timings, mini-sectors and speed-trap values.
- Live race positions, intervals and gaps between drivers.
- Pit stops, stints and tyre-compound information.
- Weather readings (air/track temperature, humidity, wind, rainfall).
- Race control messages (flags, safety car, incidents) and team-radio audio clips.
- Session and meeting metadata used as keys (`session_key`, `meeting_key`) across all endpoints.

Operational notes: all endpoints live under `https://api.openf1.org/v1/` and accept query-string filters (e.g. `session_key`, `driver_number`, `lap_number`, comparison operators like `<=`). No API key, signup, or credit card is required. The free tier is rate-limited to roughly 3 requests/second and 30 requests/minute; an optional sponsor tier raises that to 6 req/s and 60 req/min. Responses are JSON and include both live (current session) and historical data going back through past seasons.

## Try it

**TypeScript**
```bash
npm install openf1-car-data
```

**Python**
```bash
pip install openf1-car-data-sdk
```

**PHP**
```bash
composer require voxgig/openf1-car-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/openf1-car-data-sdk/go
```

**Ruby**
```bash
gem install openf1-car-data-sdk
```

**Lua**
```bash
luarocks install openf1-car-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { Openf1CarDataSDK } from 'openf1-car-data'

const client = new Openf1CarDataSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o openf1-car-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "openf1-car-data": {
      "command": "/abs/path/to/openf1-car-data-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CreateCheckoutSession** |  | `/stripe/create-checkout-session` |
| **EndpointPathPost** |  | `/{path}` |
| **RaceLap** | Per-driver lap timing records — sector times, lap duration and speed-trap values — typically retrieved from `/v1/laps` filtered by `session_key`, `driver_number` and `lap_number`. | `/race_lap` |
| **SubscriptionCancel** |  | `/subscription_cancel` |
| **SubscriptionSuccess** |  | `/subscription_success` |
| **Token** |  | `/token` |
| **Webhook** |  | `/stripe/webhook` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openf1cardata_sdk import Openf1CarDataSDK

client = Openf1CarDataSDK({})

```

### PHP

```php
<?php
require_once 'openf1cardata_sdk.php';

$client = new Openf1CarDataSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/openf1-car-data-sdk/go"

client := sdk.NewOpenf1CarDataSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Openf1CarData_sdk"

client = Openf1CarDataSDK.new({})

```

### Lua

```lua
local sdk = require("openf1-car-data_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Openf1CarDataSDK.test()
const result = await client.CreateCheckoutSession().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Openf1CarDataSDK.test(None, None)
result, err = client.CreateCheckoutSession(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Openf1CarDataSDK::test(null, null);
[$result, $err] = $client->CreateCheckoutSession(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CreateCheckoutSession(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Openf1CarDataSDK.test(nil, nil)
result, err = client.CreateCheckoutSession(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CreateCheckoutSession(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the FastAPI

- Upstream: [https://openf1.org/](https://openf1.org/)
- API docs: [https://openf1.org/#documentation](https://openf1.org/#documentation)

- Data is published under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0).
- Attribution to OpenF1 is required when redistributing or visualising the data.
- Non-commercial use only; derivative works must be shared under the same licence.
- OpenF1 is an unofficial, community-run project and is not affiliated with Formula 1, the FIA, or Formula One Management.

---

Generated from the FastAPI OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
