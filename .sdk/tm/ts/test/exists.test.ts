
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Openf1CarDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Openf1CarDataSDK.test()
    equal(testsdk instanceof Openf1CarDataSDK, true,
      'Openf1CarDataSDK.test() must return a client synchronously')
  })

})
