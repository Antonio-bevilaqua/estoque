<?php

namespace Auth\Http\Requests;

use App\Http\Requests\JsonFormRequest;

use Illuminate\Validation\Rules\Password;

/**
 * @property string email
 * @property string password
 */
class AuthRequest extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'password' => [
                'required',
                Password::min(6)
            ],
        ];
    }
}
