<?php
declare(strict_types=1);

// Openf1CarData SDK utility: result_body

class Openf1CarDataResultBody
{
    public static function call(Openf1CarDataContext $ctx): ?Openf1CarDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
