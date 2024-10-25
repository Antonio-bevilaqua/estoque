<?php

namespace Services\Table\Core\Repository\Filters;

use Illuminate\Database\Eloquent\Builder;

abstract class EqualFilter extends TableFilter
{
    abstract protected function getColumn(): string;

    protected function applyFilter(Builder $builder): void
    {
        if (empty($this->filterValue)) {
            return;
        }

        $builder->where($this->getColumn(), $this->filterValue);
    }
}
