<?php

namespace Reports\Http\Requests;

use App\Http\Requests\GetFormRequest;
use Carbon\Carbon;
use Reports\UseCases\DRE\GenerateDTO;

/**
 * @property string initial_date
 * @property string final_date
 */
class DREReportRequest extends GetFormRequest
{

    public function rules(): array
    {
        return [
            'initial_date' => [
                'required',
                'date_format:Y-m-d'
            ],
            'final_date' => [
                'required',
                'date_format:Y-m-d'
            ]
        ];
    }

    public function getDTO(): GenerateDTO
    {
        $beginning = Carbon::createFromFormat(
            "Y-m-d H:i:s",
                    $this->initial_date . " 00:00:00"
        );
        $ending = Carbon::createFromFormat(
            "Y-m-d H:i:s",
            $this->final_date . " 23:59:59"
        );

        return new GenerateDTO(
            $beginning,
            $ending
        );
    }
}
