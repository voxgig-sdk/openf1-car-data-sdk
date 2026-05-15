<?php
declare(strict_types=1);

// Openf1CarData SDK utility: feature_hook

class Openf1CarDataFeatureHook
{
    public static function call(Openf1CarDataContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
