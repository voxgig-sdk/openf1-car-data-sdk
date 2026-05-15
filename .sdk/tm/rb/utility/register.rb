# Openf1CarData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Openf1CarDataUtility.registrar = ->(u) {
  u.clean = Openf1CarDataUtilities::Clean
  u.done = Openf1CarDataUtilities::Done
  u.make_error = Openf1CarDataUtilities::MakeError
  u.feature_add = Openf1CarDataUtilities::FeatureAdd
  u.feature_hook = Openf1CarDataUtilities::FeatureHook
  u.feature_init = Openf1CarDataUtilities::FeatureInit
  u.fetcher = Openf1CarDataUtilities::Fetcher
  u.make_fetch_def = Openf1CarDataUtilities::MakeFetchDef
  u.make_context = Openf1CarDataUtilities::MakeContext
  u.make_options = Openf1CarDataUtilities::MakeOptions
  u.make_request = Openf1CarDataUtilities::MakeRequest
  u.make_response = Openf1CarDataUtilities::MakeResponse
  u.make_result = Openf1CarDataUtilities::MakeResult
  u.make_point = Openf1CarDataUtilities::MakePoint
  u.make_spec = Openf1CarDataUtilities::MakeSpec
  u.make_url = Openf1CarDataUtilities::MakeUrl
  u.param = Openf1CarDataUtilities::Param
  u.prepare_auth = Openf1CarDataUtilities::PrepareAuth
  u.prepare_body = Openf1CarDataUtilities::PrepareBody
  u.prepare_headers = Openf1CarDataUtilities::PrepareHeaders
  u.prepare_method = Openf1CarDataUtilities::PrepareMethod
  u.prepare_params = Openf1CarDataUtilities::PrepareParams
  u.prepare_path = Openf1CarDataUtilities::PreparePath
  u.prepare_query = Openf1CarDataUtilities::PrepareQuery
  u.result_basic = Openf1CarDataUtilities::ResultBasic
  u.result_body = Openf1CarDataUtilities::ResultBody
  u.result_headers = Openf1CarDataUtilities::ResultHeaders
  u.transform_request = Openf1CarDataUtilities::TransformRequest
  u.transform_response = Openf1CarDataUtilities::TransformResponse
}
