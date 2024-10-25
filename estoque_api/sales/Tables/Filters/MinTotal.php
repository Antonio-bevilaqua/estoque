<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinTotal extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "total";
    }

    public function getRequestKey(): string
    {
        return "total_min";
    }
}
