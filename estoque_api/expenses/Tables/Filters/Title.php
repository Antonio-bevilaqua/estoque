<?php

namespace Expenses\Tables\Filters;

use Services\Table\Core\Repository\Filters\LikeFilter;

class Title extends LikeFilter
{

    protected function getColumn(): string
    {
        return "title";
    }

    public function getRequestKey(): string
    {
        return "titulo";
    }
}
