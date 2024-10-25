<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Stock extends Classification
{

    protected function getKey(): string
    {
        return "products.stock";
    }

    public function getRequestKey(): string
    {
        return "estoque";
    }
}
