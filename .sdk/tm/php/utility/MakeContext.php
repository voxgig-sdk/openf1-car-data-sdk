<?php
declare(strict_types=1);

// Openf1CarData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Openf1CarDataMakeContext
{
    public static function call(array $ctxmap, ?Openf1CarDataContext $basectx): Openf1CarDataContext
    {
        return new Openf1CarDataContext($ctxmap, $basectx);
    }
}
