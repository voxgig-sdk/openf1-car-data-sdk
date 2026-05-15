<?php
declare(strict_types=1);

// Openf1CarData SDK utility: prepare_body

class Openf1CarDataPrepareBody
{
    public static function call(Openf1CarDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
