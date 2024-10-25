<?php

namespace Expenses\Tables;

use Expenses\Models\Expense;
use Expenses\Tables\Classifications\Value;
use Expenses\Tables\Filters\MaxValue;
use Expenses\Tables\Filters\MinValue;
use Expenses\Tables\Filters\Title;
use Illuminate\Database\Eloquent\Builder;
use Services\Table\Core\Repository\Classifications\CreatedClassification;
use Services\Table\Core\Repository\Classifications\IdClassification;
use Services\Table\Core\Repository\Classifications\UpdatedClassification;
use Services\Table\Core\Repository\Filters\IdFilter;
use Services\Table\Response\ResponseTable;

class Expenses extends ResponseTable
{

    protected function getBuilder(): Builder
    {
        return Expense::query();
    }

    protected function getFilters(): array
    {
        return [
            new IdFilter(),
            new MinValue(),
            new MaxValue(),
            new Title(),
        ];
    }

    protected function getClassifications(): array
    {
        return [
            new IdClassification(),
            new Value(),
            new \Expenses\Tables\Classifications\Title(),
            new CreatedClassification(),
            new UpdatedClassification(),
        ];
    }

    protected function getPostClassifications(): array
    {
        return [];
    }
}
