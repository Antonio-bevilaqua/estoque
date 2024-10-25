<?php

namespace Products\Http\Requests;

use App\Http\Rules\MoneyRule;
use Illuminate\Foundation\Http\FormRequest;

class SaveRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'barcode' => [
                'nullable',
                'numeric',
            ],
            'name' => [
                'required',
                'max:250'
            ],
            'description' => [
                'nullable',
                'max:250'
            ],
            'picture' => [
                'file',
                'nullable',
                'mimes:jpeg,jpg,png,webp',
                'max:5000'
            ],
            'value' => [
                'required',
                new MoneyRule(),
            ],
            'stock' => [
                'required',
                'numeric',
                'min:0'
            ],
        ];
    }
}
