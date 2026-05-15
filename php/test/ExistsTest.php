<?php
declare(strict_types=1);

// Openf1CarData SDK exists test

require_once __DIR__ . '/../openf1cardata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Openf1CarDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
