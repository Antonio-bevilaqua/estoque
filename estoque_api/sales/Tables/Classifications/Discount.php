<?php

namespace Sales\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Discount extends Classification
{

    protected function getKey(): string
    {
        return "discount";
    }

    public function getRequestKey(): string
    {
        return "desconto";
    }
}
