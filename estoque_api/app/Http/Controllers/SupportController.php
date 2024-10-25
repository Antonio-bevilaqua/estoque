<?php

namespace App\Http\Controllers;

use App\Http\Mail\SupportMail;
use App\Http\Requests\SupportRequest;
use App\Jobs\SendEmailJob;
use App\Models\Configuration;
use Illuminate\Http\JsonResponse;

class SupportController extends Controller
{
    public function send(SupportRequest $request): JsonResponse
    {
        $config = Configuration::query()->first();
        SendEmailJob::dispatch(
            new SupportMail(
                $request->name,
                $request->email,
                $request->phone,
                $request->message
            ),
            $config->email
        );

        return $this->success([
            "email" => $request->email
        ]);
    }
}
