<?php

namespace Expenses\Tables\Classifications;

use Services\Table\Core\Repository\Classifications\Classification;

class Title extends Classification
{

    protected function getKey(): string
    {
        return "title";
    }

    public function getRequestKey(): string
    {
        return "titulo";
    }
}
