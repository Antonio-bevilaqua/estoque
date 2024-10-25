<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxTotal extends LowerEqualsFilter
{
    protected function getColumn(): string
    {
        return "total";
    }

    public function getRequestKey(): string
    {
        return "total_max";
    }
}
