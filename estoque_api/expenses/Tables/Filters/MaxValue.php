<?php

namespace Expenses\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxValue extends LowerEqualsFilter
{

    protected function getColumn(): string
    {
        return "value";
    }

    public function getRequestKey(): string
    {
        return "max_valor";
    }
}
