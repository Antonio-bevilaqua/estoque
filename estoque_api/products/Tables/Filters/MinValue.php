<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinValue extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "products.value";
    }

    public function getRequestKey(): string
    {
        return "min_valor";
    }

    protected function maskValue(mixed $value): mixed
    {
        return str_replace(",", ".", $value);
    }
}
