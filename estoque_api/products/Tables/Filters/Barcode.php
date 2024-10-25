<?php

namespace Products\Tables\Filters;

use Services\Table\Core\Repository\Filters\EqualFilter;

class Barcode extends EqualFilter
{

    protected function getColumn(): string
    {
        return "products.barcode";
    }

    public function getRequestKey(): string
    {
        return "codigo";
    }
}
