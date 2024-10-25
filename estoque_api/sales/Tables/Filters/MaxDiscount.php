<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxDiscount extends LowerEqualsFilter
{
    protected function getColumn(): string
    {
        return "discount";
    }

    public function getRequestKey(): string
    {
        return "desconto_max";
    }
}
