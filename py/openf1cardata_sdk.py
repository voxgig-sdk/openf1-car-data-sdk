# Openf1CarData SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import Openf1CarDataUtility
from core.spec import Openf1CarDataSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import Openf1CarDataBaseFeature
from features import _make_feature


class Openf1CarDataSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = Openf1CarDataUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return Openf1CarDataUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = Openf1CarDataSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def create_checkout_session(self):
        """Idiomatic facade: client.create_checkout_session.list() / client.create_checkout_session.load({"id": ...})."""
        from entity.create_checkout_session_entity import CreateCheckoutSessionEntity
        cached = getattr(self, "_create_checkout_session", None)
        if cached is None:
            cached = CreateCheckoutSessionEntity(self, None)
            self._create_checkout_session = cached
        return cached

    def CreateCheckoutSession(self, data=None):
        # Deprecated: use client.create_checkout_session instead.
        from entity.create_checkout_session_entity import CreateCheckoutSessionEntity
        return CreateCheckoutSessionEntity(self, data)


    @property
    def endpoint_path_post(self):
        """Idiomatic facade: client.endpoint_path_post.list() / client.endpoint_path_post.load({"id": ...})."""
        from entity.endpoint_path_post_entity import EndpointPathPostEntity
        cached = getattr(self, "_endpoint_path_post", None)
        if cached is None:
            cached = EndpointPathPostEntity(self, None)
            self._endpoint_path_post = cached
        return cached

    def EndpointPathPost(self, data=None):
        # Deprecated: use client.endpoint_path_post instead.
        from entity.endpoint_path_post_entity import EndpointPathPostEntity
        return EndpointPathPostEntity(self, data)


    @property
    def race_lap(self):
        """Idiomatic facade: client.race_lap.list() / client.race_lap.load({"id": ...})."""
        from entity.race_lap_entity import RaceLapEntity
        cached = getattr(self, "_race_lap", None)
        if cached is None:
            cached = RaceLapEntity(self, None)
            self._race_lap = cached
        return cached

    def RaceLap(self, data=None):
        # Deprecated: use client.race_lap instead.
        from entity.race_lap_entity import RaceLapEntity
        return RaceLapEntity(self, data)


    @property
    def subscription_cancel(self):
        """Idiomatic facade: client.subscription_cancel.list() / client.subscription_cancel.load({"id": ...})."""
        from entity.subscription_cancel_entity import SubscriptionCancelEntity
        cached = getattr(self, "_subscription_cancel", None)
        if cached is None:
            cached = SubscriptionCancelEntity(self, None)
            self._subscription_cancel = cached
        return cached

    def SubscriptionCancel(self, data=None):
        # Deprecated: use client.subscription_cancel instead.
        from entity.subscription_cancel_entity import SubscriptionCancelEntity
        return SubscriptionCancelEntity(self, data)


    @property
    def subscription_success(self):
        """Idiomatic facade: client.subscription_success.list() / client.subscription_success.load({"id": ...})."""
        from entity.subscription_success_entity import SubscriptionSuccessEntity
        cached = getattr(self, "_subscription_success", None)
        if cached is None:
            cached = SubscriptionSuccessEntity(self, None)
            self._subscription_success = cached
        return cached

    def SubscriptionSuccess(self, data=None):
        # Deprecated: use client.subscription_success instead.
        from entity.subscription_success_entity import SubscriptionSuccessEntity
        return SubscriptionSuccessEntity(self, data)


    @property
    def token(self):
        """Idiomatic facade: client.token.list() / client.token.load({"id": ...})."""
        from entity.token_entity import TokenEntity
        cached = getattr(self, "_token", None)
        if cached is None:
            cached = TokenEntity(self, None)
            self._token = cached
        return cached

    def Token(self, data=None):
        # Deprecated: use client.token instead.
        from entity.token_entity import TokenEntity
        return TokenEntity(self, data)


    @property
    def webhook(self):
        """Idiomatic facade: client.webhook.list() / client.webhook.load({"id": ...})."""
        from entity.webhook_entity import WebhookEntity
        cached = getattr(self, "_webhook", None)
        if cached is None:
            cached = WebhookEntity(self, None)
            self._webhook = cached
        return cached

    def Webhook(self, data=None):
        # Deprecated: use client.webhook instead.
        from entity.webhook_entity import WebhookEntity
        return WebhookEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
