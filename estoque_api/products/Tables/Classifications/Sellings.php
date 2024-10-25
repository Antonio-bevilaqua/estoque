<?php

namespace Products\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Sellings extends Classification
{

    protected function getKey(): string
    {
        return "total_sales";
    }

    public function getRequestKey(): string
    {
        return "vendas";
    }
}
