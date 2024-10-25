<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxValue extends LowerEqualsFilter
{

    protected function getColumn(): string
    {
        return "products.value";
    }

    public function getRequestKey(): string
    {
        return "max_valor";
    }

    protected function maskValue(mixed $value): mixed
    {
        return str_replace(",", ".", $value);
    }
}
