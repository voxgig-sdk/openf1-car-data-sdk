
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Openf1CarDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Openf1CarDataSDK.test()
    equal(null !== testsdk, true)
  })

})
