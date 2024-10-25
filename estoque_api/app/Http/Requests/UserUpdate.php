<?php

namespace App\Http\Requests;

class UserUpdate extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'name' => 'required'
        ];
    }
}
