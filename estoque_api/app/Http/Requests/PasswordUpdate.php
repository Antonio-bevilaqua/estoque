<?php

namespace App\Http\Requests;

use App\Http\Rules\OldPasswordRule;

/**
 * @property string password
 */
class PasswordUpdate extends JsonFormRequest
{
    public function rules(): array
    {
        return [
            'old_password' => [
                'required',
                'min:6',
                'alpha_dash',
                new OldPasswordRule(
                    $this->user()
                )
            ],
            'password' => 'required|min:6|alpha_dash|confirmed',
        ];
    }

    public function attributes(): array
    {
        return [
            'old_password' => "Senha Atual",
            'password' => "Nova Senha",
        ];
    }
}
