<?php

namespace App\Http\Mail;

use App\Http\Mail\Mailable;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;

class SupportMail extends Mailable
{
    use Queueable, SerializesModels;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(
        public string $name,
        public string $email,
        public string $whatsapp,
        public string $userMessage,
    )
    {
        parent::__construct();
    }

    public function getSubject(): string
    {
        return "Suporte - SITE";
    }

    public function getView(): string
    {
        return 'mail.support-message';
    }
}
