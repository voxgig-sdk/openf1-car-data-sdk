-- Openf1CarData SDK error

local Openf1CarDataError = {}
Openf1CarDataError.__index = Openf1CarDataError


function Openf1CarDataError.new(code, msg, ctx)
  local self = setmetatable({}, Openf1CarDataError)
  self.is_sdk_error = true
  self.sdk = "Openf1CarData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Openf1CarDataError:error()
  return self.msg
end


function Openf1CarDataError:__tostring()
  return self.msg
end


return Openf1CarDataError
