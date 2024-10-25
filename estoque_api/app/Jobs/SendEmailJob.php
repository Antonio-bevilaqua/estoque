<?php

namespace App\Jobs;

use App\Http\Mail\Mailable;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private Mailable $mail;
    private string|array $email;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Mailable $mail, string|array $email)
    {
        $this->mail = $mail;
        $this->email = $email;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(): void
    {
        $emailsToSend = (is_array($this->email)) ? $this->email : [$this->email];
        Mail::to($emailsToSend)->send($this->mail);
    }
}
