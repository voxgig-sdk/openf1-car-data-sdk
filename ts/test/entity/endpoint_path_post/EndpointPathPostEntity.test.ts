

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


describe('EndpointPathPostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENF1_CAR_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENF1_CAR_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Openf1CarDataSDK.test()
    const ent = testsdk.EndpointPathPost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENF1_CAR_DATA_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'endpoint_path_post.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"endpoint_path_post","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{path}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"path","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{path}","q":{"exist":["id"]},"r":{"param":{"path":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"endpoint_path_post","name__orig":"endpoint_path_post","Name":"EndpointPathPost","name_":"endpoint_path_post","name-":"endpoint-path-post","NAME":"ENDPOINT_PATH_POST","index$":1}, {"active":true,"entity":"endpoint_path_post","key$":"BasicEndpointPathPostFlow","kind":"basic","name":"BasicEndpointPathPostFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"endpoint_path_post_ref01"},"m":{"path":"path01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"endpoint_path_post_ref01","srcdatavar":"endpoint_path_post_ref01_data","suffix":"_dt0"},"m":{"id":"endpoint_path_post01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-endpoint_path_post_ref01"}}],"index$":1}]}, 'EndpointPathPost', {"POST /{path}":{"protocol":"http","operationId":"endpoint__path__post","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"path","in":"path","required":true,"schema":{"type":"string","title":"Path"},"index$":0}],"securitySource":"unspecified"},"GET /{path}":{"protocol":"http","operationId":"endpoint__path__post","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"path","in":"path","required":true,"schema":{"type":"string","title":"Path"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const endpoint_path_post_ref01_ent = client.EndpointPathPost()
    let endpoint_path_post_ref01_data = setup.data.new.endpoint_path_post['endpoint_path_post_ref01']
    endpoint_path_post_ref01_data['path'] = setup.idmap['path01']

    endpoint_path_post_ref01_data = (await endpoint_path_post_ref01_ent.create(endpoint_path_post_ref01_data)).data()
    assert(null != endpoint_path_post_ref01_data.id)


    // LOAD
    const endpoint_path_post_ref01_match_dt0: any = {}
    endpoint_path_post_ref01_match_dt0.id = endpoint_path_post_ref01_data.id
    const endpoint_path_post_ref01_data_dt0 = (await endpoint_path_post_ref01_ent.load(endpoint_path_post_ref01_match_dt0)).data()
    assert(endpoint_path_post_ref01_data_dt0.id === endpoint_path_post_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/endpoint_path_post/EndpointPathPostTestData.json')

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
    ['endpoint_path_post01','endpoint_path_post02','endpoint_path_post03','path01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID': idmap,
    'OPENF1_CAR_DATA_TEST_LIVE': 'FALSE',
    'OPENF1_CAR_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID']

  const live = 'TRUE' === env.OPENF1_CAR_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENF1_CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID']
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
  
