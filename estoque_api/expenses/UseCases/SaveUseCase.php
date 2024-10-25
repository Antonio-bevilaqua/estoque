<?php

namespace Expenses\UseCases;

use Carbon\Carbon;
use DateTimeZone;
use Expenses\Http\Requests\SaveRequest;
use Expenses\Models\Expense;

class SaveUseCase
{
    public function execute(SaveRequest $request, ?Expense $expense = null): Expense
    {
        $expense = $expense ?? new Expense();

        $data = $request->all();
        $data['value'] = str_replace(',', '.', $data['value']);
        $expense->fill($data);

        $carbon = Carbon::createFromFormat(
            'Y-m-d H:i',
            $request->date . " " . $request->time,
            new DateTimeZone('America/Sao_paulo')
        );
        $carbon->tz('UTC');
        $expense->created_at = $carbon->format("Y-m-d H:i:s");
        $expense->save();
        return $expense;
    }
}
