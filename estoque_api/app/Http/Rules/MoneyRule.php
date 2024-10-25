<?php

namespace App\Http\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MoneyRule implements ValidationRule
{

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $value = str_replace(',', '.', $value);
        $value = preg_replace('/[^0-9.]/', '', $value);
        if (!is_numeric($value)) $fail("Valor monetário inválido.");

        if ((float)$value < 0) $fail("O valor monetário deve igual ou superior a 0.");
    }
}
