<?php

namespace Sales\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class SubTotal extends Classification
{

    protected function getKey(): string
    {
        return "subtotal";
    }

    public function getRequestKey(): string
    {
        return "subtotal";
    }
}
