<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\LowerEqualsFilter;

class MaxStock extends LowerEqualsFilter
{

    protected function getColumn(): string
    {
        return 'products.stock';
    }

    public function getRequestKey(): string
    {
        return "max_estoque";
    }
}
