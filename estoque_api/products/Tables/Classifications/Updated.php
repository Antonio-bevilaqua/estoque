<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Updated extends Classification
{

    protected function getKey(): string
    {
        return "products.updated_at";
    }

    public function getRequestKey(): string
    {
        return "atualizacao";
    }
}
