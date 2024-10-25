<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinDiscount extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "discount";
    }

    public function getRequestKey(): string
    {
        return "desconto_min";
    }
}
