<?php
declare(strict_types=1);

// Openf1CarData SDK utility: result_headers

class Openf1CarDataResultHeaders
{
    public static function call(Openf1CarDataContext $ctx): ?Openf1CarDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
