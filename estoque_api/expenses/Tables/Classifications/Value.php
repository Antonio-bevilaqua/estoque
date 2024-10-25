<?php

namespace Expenses\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Value extends Classification
{

    protected function getKey(): string
    {
        return "value";
    }

    public function getRequestKey(): string
    {
        return "valor";
    }
}
