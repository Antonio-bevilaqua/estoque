<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\EqualFilter;

class Id extends EqualFilter
{

    protected function getColumn(): string
    {
        return "products.id";
    }

    public function getRequestKey(): string
    {
        return "id";
    }
}
