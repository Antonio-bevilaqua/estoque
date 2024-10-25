<?php

namespace Auth\Http\Mail;

use App\Http\Mail\Mailable;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;

class PasswordRecovery extends Mailable
{
    use Queueable, SerializesModels;

    public string $token;
    public string $name;

    public string $link;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $name, string $token)
    {
        parent::__construct();
        $this->name = $name;
        $this->token = $token;
        $this->link = env('FRONTEND_URL', 'http://localhost:3000') . "/login/recuperar?token=" . $this->token;
    }

    public function getSubject(): string
    {
        return "Recuperação De Conta";
    }

    public function getView(): string
    {
        return 'mail.password-recovery';
    }
}
