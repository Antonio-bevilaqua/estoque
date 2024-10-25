<?php

namespace Sales\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Total extends Classification
{

    protected function getKey(): string
    {
        return "total";
    }

    public function getRequestKey(): string
    {
        return "total";
    }
}
