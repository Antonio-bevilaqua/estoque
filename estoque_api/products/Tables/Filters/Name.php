<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\LikeFilter;

class Name extends LikeFilter
{

    protected function getColumn(): string
    {
        return "products.name";
    }

    public function getRequestKey(): string
    {
        return "nome";
    }
}
