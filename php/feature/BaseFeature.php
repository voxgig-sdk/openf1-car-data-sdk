<?php
declare(strict_types=1);

// Openf1CarData SDK base feature

class Openf1CarDataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Openf1CarDataContext $ctx, array $options): void {}
    public function PostConstruct(Openf1CarDataContext $ctx): void {}
    public function PostConstructEntity(Openf1CarDataContext $ctx): void {}
    public function SetData(Openf1CarDataContext $ctx): void {}
    public function GetData(Openf1CarDataContext $ctx): void {}
    public function GetMatch(Openf1CarDataContext $ctx): void {}
    public function SetMatch(Openf1CarDataContext $ctx): void {}
    public function PrePoint(Openf1CarDataContext $ctx): void {}
    public function PreSpec(Openf1CarDataContext $ctx): void {}
    public function PreRequest(Openf1CarDataContext $ctx): void {}
    public function PreResponse(Openf1CarDataContext $ctx): void {}
    public function PreResult(Openf1CarDataContext $ctx): void {}
    public function PreDone(Openf1CarDataContext $ctx): void {}
    public function PreUnexpected(Openf1CarDataContext $ctx): void {}
}
