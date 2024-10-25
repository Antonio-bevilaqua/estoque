<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinSellings extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "total_sales";
    }

    public function getRequestKey(): string
    {
        return "min_vendas";
    }
}
