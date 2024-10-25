<?php

namespace Auth\Http\Requests;

use App\Http\Requests\JsonFormRequest;

/**
 * @property string email
 */
class RecoveryRequest extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email'
        ];
    }

    public function messages(): array
    {
        return [
            'email' => "Email não encontrado em nossos cadastros"
        ];
    }
}
