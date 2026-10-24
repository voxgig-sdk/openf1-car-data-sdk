

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Openf1CarDataSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('TokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENF1_CAR_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENF1_CAR_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Openf1CarDataSDK.test()
    const ent = testsdk.Token()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = Openf1CarDataSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Token().create({"client_id":1,"password":"x","username":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENF1_CAR_DATA_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"client_id":{"a":true,"h":"Client Id","n":"client_id","r":false,"t":"`$STRING`","key$":"client_id","index$":0},"client_secret":{"a":true,"fo":"password","h":"Client Secret","n":"client_secret","r":false,"t":"`$ANY`","key$":"client_secret","index$":1},"grant_type":{"a":true,"h":"Grant Type","n":"grant_type","r":false,"t":"`$ANY`","key$":"grant_type","index$":2},"password":{"a":true,"fo":"password","h":"Password","n":"password","r":true,"t":"`$STRING`","key$":"password","index$":3},"scope":{"a":true,"h":"Scope","n":"scope","r":false,"t":"`$STRING`","key$":"scope","index$":4},"username":{"a":true,"h":"Username","n":"username","r":true,"t":"`$STRING`","key$":"username","index$":5}},"name":"token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /token","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/token","q":{},"r":{},"rb":{"fields":[{"name":"client_id"},{"name":"client_secret"},{"name":"grant_type"},{"name":"password"},{"name":"scope"},{"name":"username"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"token","name__orig":"token","Name":"Token","name_":"token","name-":"token","NAME":"TOKEN","index$":5}, {"active":true,"entity":"token","key$":"BasicTokenFlow","kind":"basic","name":"BasicTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"token_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Token', {"POST /token":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"properties":{"grant_type":{"anyOf":[{"type":"string","pattern":"^password$"},{"type":"null"}],"title":"Grant Type","key$":"grant_type"},"username":{"type":"string","title":"Username","key$":"username"},"password":{"type":"string","format":"password","title":"Password","key$":"password"},"scope":{"type":"string","title":"Scope","default":"","key$":"scope"},"client_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Client Id","key$":"client_id"},"client_secret":{"anyOf":[{"type":"string"},{"type":"null"}],"format":"password","title":"Client Secret","key$":"client_secret"}},"type":"object","required":["username","password"],"title":"Body_login_for_access_token_token_post","x-ref":"#/components/schemas/Body_login_for_access_token_token_post","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const token_ref01_ent = client.Token()
    let token_ref01_data = setup.data.new.token['token_ref01']

    token_ref01_data = (await token_ref01_ent.create(token_ref01_data)).data()
    assert(null != token_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/token/TokenTestData.json')

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
    ['token01','token02','token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENF1_CAR_DATA_TEST_TOKEN_ENTID': idmap,
    'OPENF1_CAR_DATA_TEST_LIVE': 'FALSE',
    'OPENF1_CAR_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPENF1_CAR_DATA_TEST_TOKEN_ENTID']

  const live = 'TRUE' === env.OPENF1_CAR_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENF1_CAR_DATA_TEST_TOKEN_ENTID']
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
  
