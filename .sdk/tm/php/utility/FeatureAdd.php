<?php
declare(strict_types=1);

// Openf1CarData SDK utility: feature_add

class Openf1CarDataFeatureAdd
{
    public static function call(Openf1CarDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
