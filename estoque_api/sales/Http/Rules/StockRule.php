<?php

namespace Sales\Http\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Collection;
use Products\Models\Product;

readonly class StockRule implements ValidationRule
{
    /**
     * @param Collection<int, Product> $products
     */
    public function __construct(private Collection $products)
    {

    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        foreach ($value as $i => $quantity) {
            if ($this->products[$i]->stock < $quantity) {
                $fail("O produto {$this->products[$i]->name} não possui estoque suficiente.");
            }
        }
    }
}
