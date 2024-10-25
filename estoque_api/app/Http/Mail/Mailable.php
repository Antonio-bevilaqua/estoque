<?php

namespace App\Http\Mail;

use App\Models\Configuration;

abstract class Mailable extends \Illuminate\Mail\Mailable
{
    public string $company;

    public function __construct()
    {
        $config = Configuration::query()->select('company')->first();
        $this->company = $config->company;
    }

    public function build(): static
    {
        return $this->from(env("MAIL_FROM_ADDRESS", "noreply@localhost.com"),
            $this->company
        )->subject($this->getSubject())
            ->view($this->getView());
    }

    abstract public function getSubject(): string;

    abstract public function getView(): string;

}
