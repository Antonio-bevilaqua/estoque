<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Id extends Classification
{

    protected function getKey(): string
    {
        return "products.id";
    }

    public function getRequestKey(): string
    {
        return "id";
    }
}
