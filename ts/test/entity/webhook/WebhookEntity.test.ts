

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Openf1CarDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENF1_CAR_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENF1_CAR_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Openf1CarDataSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENF1_CAR_DATA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /stripe/webhook","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/stripe/webhook","q":{},"r":{},"s":[{"lit":"stripe"},{"lit":"webhook"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":6}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Webhook', {"POST /stripe/webhook":{"protocol":"http","operationId":"stripe_webhook_stripe_webhook_post","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Openf1CarDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['webhook01','webhook02','webhook03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENF1_CAR_DATA_TEST_WEBHOOK_ENTID': idmap,
    'OPENF1_CAR_DATA_TEST_LIVE': 'FALSE',
    'OPENF1_CAR_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPENF1_CAR_DATA_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.OPENF1_CAR_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENF1_CAR_DATA_TEST_WEBHOOK_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Openf1CarDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPENF1_CAR_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
