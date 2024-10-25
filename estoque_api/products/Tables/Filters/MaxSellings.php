<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxSellings extends LowerEqualsFilter
{

    protected function getColumn(): string
    {
        return "total_sales";
    }

    public function getRequestKey(): string
    {
        return "max_vendas";
    }
}
