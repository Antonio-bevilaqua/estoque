<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Name extends Classification
{

    protected function getKey(): string
    {
        return "products.name";
    }

    public function getRequestKey(): string
    {
        return "nome";
    }
}
