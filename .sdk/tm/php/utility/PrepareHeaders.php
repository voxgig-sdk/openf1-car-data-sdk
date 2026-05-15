<?php
declare(strict_types=1);

// Openf1CarData SDK utility: prepare_headers

class Openf1CarDataPrepareHeaders
{
    public static function call(Openf1CarDataContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
