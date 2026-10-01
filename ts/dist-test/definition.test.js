"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "create_checkout_session",
        "accessor": "CreateCheckoutSession",
        "op": "create",
        "method": "POST",
        "path": "/stripe/create-checkout-session",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "endpoint_path_post",
        "accessor": "EndpointPathPost",
        "op": "create",
        "method": "POST",
        "path": "/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "endpoint_path_post",
        "accessor": "EndpointPathPost",
        "op": "load",
        "method": "GET",
        "path": "/{path}",
        "args": [
            {
                "name": "id",
                "wire": "path",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "race_lap",
        "accessor": "RaceLap",
        "op": "create",
        "method": "POST",
        "path": "/race_lap",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "race_lap",
        "accessor": "RaceLap",
        "op": "load",
        "method": "GET",
        "path": "/race_lap",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "subscription_cancel",
        "accessor": "SubscriptionCancel",
        "op": "load",
        "method": "GET",
        "path": "/subscription_cancel",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "subscription_success",
        "accessor": "SubscriptionSuccess",
        "op": "load",
        "method": "GET",
        "path": "/subscription_success",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "token",
        "accessor": "Token",
        "op": "create",
        "method": "POST",
        "path": "/token",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "webhook",
        "accessor": "Webhook",
        "op": "create",
        "method": "POST",
        "path": "/stripe/webhook",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map