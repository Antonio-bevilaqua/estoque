<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\BiggerEqualsFilter;

class MinStock extends BiggerEqualsFilter
{

    protected function getColumn(): string
    {
        return "products.stock";
    }

    public function getRequestKey(): string
    {
        return "min_estoque";
    }
}
