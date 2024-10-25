<?php

namespace App\Http\Requests;

/**
 * @property string name
 * @property string email
 * @property string phone
 * @property string message
 */
class SupportRequest extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'message' => 'required',
        ];
    }
}
