<?php

namespace App\Http\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Hash;

readonly class OldPasswordRule implements ValidationRule
{
    public function __construct(private User $user)
    {

    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!Hash::check($value, $this->user->password)) $fail(
            "Senha antiga incorreta"
        );
    }
}
