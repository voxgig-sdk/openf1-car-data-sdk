<?php
declare(strict_types=1);

// Openf1CarData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Openf1CarDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Openf1CarDataBaseFeature();
            case "test":
                return new Openf1CarDataTestFeature();
            default:
                return new Openf1CarDataBaseFeature();
        }
    }
}
