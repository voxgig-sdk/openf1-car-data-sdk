
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { Openf1CarDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('EndpointPathPostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENF1CARDATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENF1CARDATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Openf1CarDataSDK.test()
    const ent = testsdk.EndpointPathPost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENF__CAR_DATA_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'endpoint_path_post.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set OPENF__CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const endpoint_path_post_ref01_ent = client.EndpointPathPost()
    let endpoint_path_post_ref01_data = setup.data.new.endpoint_path_post['endpoint_path_post_ref01']
    endpoint_path_post_ref01_data['path'] = setup.idmap['path01']

    endpoint_path_post_ref01_data = await endpoint_path_post_ref01_ent.create(endpoint_path_post_ref01_data)
    assert(null != endpoint_path_post_ref01_data)



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
    ['endpoint_path_post01','endpoint_path_post02','endpoint_path_post03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['OPENF__CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'OPENF__CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID': idmap,
    'OPENF__CAR_DATA_TEST_LIVE': 'FALSE',
    'OPENF__CAR_DATA_TEST_EXPLAIN': 'FALSE',
    'OPENF__CAR_DATA_APIKEY': 'NONE',
  })

  idmap = env['OPENF__CAR_DATA_TEST_ENDPOINT_PATH_POST_ENTID']

  const live = 'TRUE' === env.OPENF__CAR_DATA_TEST_LIVE

  if (live) {
    client = new Openf1CarDataSDK(merge([
      {
        apikey: env.OPENF__CAR_DATA_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPENF__CAR_DATA_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
