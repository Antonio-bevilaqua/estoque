<?php

namespace Services\Table\Core\Repository\Filters;

use Illuminate\Database\Eloquent\Builder;

class UntilFilter extends TableFilter
{
    public function getRequestKey(): string
    {
        return "ate";
    }

    protected function applyFilter(Builder $builder): void
    {
        if (empty($this->filterValue)) {
            return;
        }

        $builder->where("created_at", "<=", $this->filterValue);
    }
}
