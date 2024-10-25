<?php

namespace App\Http\Requests;

class Configurations extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'company' => [
                'required',
                'string',
            ],
            'cnpj' => [
                'nullable',
                'string',
                'max:20'
            ],
            'whatsapp' => [
                'nullable',
                'string',
                'max:20'
            ],
            'phone' => [
                'nullable',
                'string',
                'max:20'
            ],
            'email' => [
                'required',
                'string',
                'max:250'
            ],
        ];
    }
}
