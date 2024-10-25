<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Value extends Classification
{

    protected function getKey(): string
    {
        return "products.value";
    }

    public function getRequestKey(): string
    {
        return "valor";
    }
}
