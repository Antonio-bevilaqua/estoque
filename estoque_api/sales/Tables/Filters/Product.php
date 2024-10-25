<?php

namespace Sales\Tables\Filters;

use Illuminate\Database\Eloquent\Builder;
use Services\Table\Core\Repository\Filters\TableFilter;

class Product extends TableFilter
{

    public function getRequestKey(): string
    {
        return "produto";
    }

    protected function applyFilter(Builder $builder): void
    {
        if (empty($this->filterValue)) {
            return;
        }

        $builder->whereHas('products',
            fn(Builder $query) => $query->where('name', "LIKE", "%{$this->filterValue}%")
        );
    }
}
