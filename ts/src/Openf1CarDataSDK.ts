// Openf1CarData Ts SDK

import { CreateCheckoutSessionEntity } from './entity/CreateCheckoutSessionEntity'
import { EndpointPathPostEntity } from './entity/EndpointPathPostEntity'
import { RaceLapEntity } from './entity/RaceLapEntity'
import { SubscriptionCancelEntity } from './entity/SubscriptionCancelEntity'
import { SubscriptionSuccessEntity } from './entity/SubscriptionSuccessEntity'
import { TokenEntity } from './entity/TokenEntity'
import { WebhookEntity } from './entity/WebhookEntity'

export type * from './Openf1CarDataTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { Openf1CarDataEntityBase } from './Openf1CarDataEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class Openf1CarDataSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _create_checkout_session?: CreateCheckoutSessionEntity

  // Idiomatic facade: `client.create_checkout_session.list()` / `client.create_checkout_session.load({ id })`.
  get create_checkout_session(): CreateCheckoutSessionEntity {
    return (this._create_checkout_session ??= new CreateCheckoutSessionEntity(this, undefined))
  }

  /** @deprecated Use `client.create_checkout_session` instead. */
  CreateCheckoutSession(data?: any) {
    const self = this
    return new CreateCheckoutSessionEntity(self,data)
  }


  _endpoint_path_post?: EndpointPathPostEntity

  // Idiomatic facade: `client.endpoint_path_post.list()` / `client.endpoint_path_post.load({ id })`.
  get endpoint_path_post(): EndpointPathPostEntity {
    return (this._endpoint_path_post ??= new EndpointPathPostEntity(this, undefined))
  }

  /** @deprecated Use `client.endpoint_path_post` instead. */
  EndpointPathPost(data?: any) {
    const self = this
    return new EndpointPathPostEntity(self,data)
  }


  _race_lap?: RaceLapEntity

  // Idiomatic facade: `client.race_lap.list()` / `client.race_lap.load({ id })`.
  get race_lap(): RaceLapEntity {
    return (this._race_lap ??= new RaceLapEntity(this, undefined))
  }

  /** @deprecated Use `client.race_lap` instead. */
  RaceLap(data?: any) {
    const self = this
    return new RaceLapEntity(self,data)
  }


  _subscription_cancel?: SubscriptionCancelEntity

  // Idiomatic facade: `client.subscription_cancel.list()` / `client.subscription_cancel.load({ id })`.
  get subscription_cancel(): SubscriptionCancelEntity {
    return (this._subscription_cancel ??= new SubscriptionCancelEntity(this, undefined))
  }

  /** @deprecated Use `client.subscription_cancel` instead. */
  SubscriptionCancel(data?: any) {
    const self = this
    return new SubscriptionCancelEntity(self,data)
  }


  _subscription_success?: SubscriptionSuccessEntity

  // Idiomatic facade: `client.subscription_success.list()` / `client.subscription_success.load({ id })`.
  get subscription_success(): SubscriptionSuccessEntity {
    return (this._subscription_success ??= new SubscriptionSuccessEntity(this, undefined))
  }

  /** @deprecated Use `client.subscription_success` instead. */
  SubscriptionSuccess(data?: any) {
    const self = this
    return new SubscriptionSuccessEntity(self,data)
  }


  _token?: TokenEntity

  // Idiomatic facade: `client.token.list()` / `client.token.load({ id })`.
  get token(): TokenEntity {
    return (this._token ??= new TokenEntity(this, undefined))
  }

  /** @deprecated Use `client.token` instead. */
  Token(data?: any) {
    const self = this
    return new TokenEntity(self,data)
  }


  _webhook?: WebhookEntity

  // Idiomatic facade: `client.webhook.list()` / `client.webhook.load({ id })`.
  get webhook(): WebhookEntity {
    return (this._webhook ??= new WebhookEntity(this, undefined))
  }

  /** @deprecated Use `client.webhook` instead. */
  Webhook(data?: any) {
    const self = this
    return new WebhookEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new Openf1CarDataSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return Openf1CarDataSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Openf1CarData' }
  }

  toString() {
    return 'Openf1CarData ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = Openf1CarDataSDK


export {
  stdutil,

  BaseFeature,
  Openf1CarDataEntityBase,

  Openf1CarDataSDK,
  SDK,
}


