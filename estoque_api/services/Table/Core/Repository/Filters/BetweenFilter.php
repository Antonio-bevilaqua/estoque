<?php

namespace Services\Table\Core\Repository\Filters;

use Illuminate\Database\Eloquent\Builder;

abstract class BetweenFilter extends TableFilter
{
    abstract protected function getColumn(): string;

    protected function applyFilter(Builder $builder): void
    {
        if (empty($this->filterValue)) {
            return;
        }

        $builder->whereBetween($this->getColumn(), $this->filterValue);
    }
}
