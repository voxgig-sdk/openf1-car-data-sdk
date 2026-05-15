# Openf1CarData SDK utility: make_context

from core.context import Openf1CarDataContext


def make_context_util(ctxmap, basectx):
    return Openf1CarDataContext(ctxmap, basectx)
