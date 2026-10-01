-- Openf1CarData SDK error

local json = require("dkjson")

local Openf1CarDataError = {}
Openf1CarDataError.__index = Openf1CarDataError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function Openf1CarDataError.new(code, msg, ctx)
  local self = setmetatable({}, Openf1CarDataError)
  self.is_sdk_error = true
  self.sdk = "Openf1CarData"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function Openf1CarDataError:context()
  return CONTEXT[self]
end


function Openf1CarDataError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function Openf1CarDataError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function Openf1CarDataError:to_json()
  return json.encode(self:to_table())
end


function Openf1CarDataError:__tostring()
  return self.msg
end


function Openf1CarDataError.__tojson(self)
  return self:to_json()
end


return Openf1CarDataError
