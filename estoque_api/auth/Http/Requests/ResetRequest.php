<?php

namespace Auth\Http\Requests;

use App\Http\Requests\JsonFormRequest;
use Illuminate\Validation\Rules\Password;

/**
 * @property string token
 * @property string password
 */
class ResetRequest extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'token' => 'required|exists:password_reset_tokens,token',
            'password' => [
                'required',
                'confirmed',
                Password::min(6)
            ]
        ];
    }
}
