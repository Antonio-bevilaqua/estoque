<?php

namespace Expenses\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinValue extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "value";
    }

    public function getRequestKey(): string
    {
        return "min_valor";
    }
}
