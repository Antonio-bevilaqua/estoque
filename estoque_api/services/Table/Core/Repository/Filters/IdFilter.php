<?php

namespace Services\Table\Core\Repository\Filters;

use Illuminate\Database\Eloquent\Builder;

class IdFilter extends TableFilter
{
    public function getRequestKey(): string
    {
        return "id";
    }

    protected function applyFilter(Builder $builder): void
    {
        if (empty($this->filterValue)) {
            return;
        }

        $builder->where('id', $this->filterValue);
    }
}
