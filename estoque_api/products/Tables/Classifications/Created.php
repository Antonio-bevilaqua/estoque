<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Created extends Classification
{

    protected function getKey(): string
    {
        return "products.created_at";
    }

    public function getRequestKey(): string
    {
        return "criacao";
    }
}
