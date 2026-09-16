

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CreateCheckoutSessionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENF1_CAR_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENF1_CAR_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Openf1CarDataSDK.test()
    const ent = testsdk.CreateCheckoutSession()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENF1_CAR_DATA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_checkout_session.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"create_checkout_session","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /stripe/create-checkout-session","json":"{\"operationId\":\"create_checkout_session_stripe_create_checkout_session_post\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{}}},\"description\":\"Successful Response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/stripe/create-checkout-session","segments":[{"lit":"stripe"},{"lit":"create-checkout-session"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"create_checkout_session","name__orig":"create_checkout_session","Name":"CreateCheckoutSession","name_":"create_checkout_session","name-":"create-checkout-session","NAME":"CREATE_CHECKOUT_SESSION","index$":0}, {"active":true,"entity":"create_checkout_session","key$":"BasicCreateCheckoutSessionFlow","kind":"basic","name":"BasicCreateCheckoutSessionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"create_checkout_session_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'CreateCheckoutSession')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_checkout_session_ref01_ent = client.CreateCheckoutSession()
    let create_checkout_session_ref01_data = setup.data.new.create_checkout_session['create_checkout_session_ref01']

    create_checkout_session_ref01_data = (await create_checkout_session_ref01_ent.create(create_checkout_session_ref01_data)).data()
    assert(null != create_checkout_session_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/create_checkout_session/CreateCheckoutSessionTestData.json')

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
    ['create_checkout_session01','create_checkout_session02','create_checkout_session03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENF1_CAR_DATA_TEST_CREATE_CHECKOUT_SESSION_ENTID': idmap,
    'OPENF1_CAR_DATA_TEST_LIVE': 'FALSE',
    'OPENF1_CAR_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPENF1_CAR_DATA_TEST_CREATE_CHECKOUT_SESSION_ENTID']

  const live = 'TRUE' === env.OPENF1_CAR_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENF1_CAR_DATA_TEST_CREATE_CHECKOUT_SESSION_ENTID']
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
  
