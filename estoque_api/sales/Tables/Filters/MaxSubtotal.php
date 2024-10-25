<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxSubtotal extends LowerEqualsFilter
{
    protected function getColumn(): string
    {
        return "subtotal";
    }

    public function getRequestKey(): string
    {
        return "subtotal_max";
    }
}
