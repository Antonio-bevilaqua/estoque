<?php

namespace Sales\Tables\Filters;

use Services\Table\Core\Repository\Filters\LikeFilter;

class Observations extends LikeFilter
{

    protected function getColumn(): string
    {
        return "observations";
    }

    public function getRequestKey(): string
    {
        return "observacoes";
    }
}
