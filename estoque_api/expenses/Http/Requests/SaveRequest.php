<?php

namespace Expenses\Http\Requests;

use App\Http\Requests\JsonFormRequest;
use App\Http\Rules\MoneyRule;

/**
 * @property string date
 * @property string time
 */
class SaveRequest extends JsonFormRequest
{

    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'alpha_num:ascii',
                'max:250'
            ],
            'description' => [
                'nullable',
                'string',
                'max:250'
            ],
            'date' => [
                'required',
                'date_format:Y-m-d',
            ],
            'time' => [
                'required',
                'date_format:H:i',
            ],
            'value' => [
                'required',
                new MoneyRule(),
            ],
        ];
    }
}
