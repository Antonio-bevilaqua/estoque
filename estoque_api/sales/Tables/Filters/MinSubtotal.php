<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinSubtotal extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "subtotal";
    }

    public function getRequestKey(): string
    {
        return "subtotal_min";
    }
}
