<?php

namespace Sales\Tables;

use Illuminate\Database\Eloquent\Builder;
use Sales\Models\Sale;
use Sales\Tables\Classifications\Discount;
use Sales\Tables\Classifications\SubTotal;
use Sales\Tables\Classifications\Total;
use Sales\Tables\Filters\MaxDiscount;
use Sales\Tables\Filters\MaxSubtotal;
use Sales\Tables\Filters\MaxTotal;
use Sales\Tables\Filters\MinDiscount;
use Sales\Tables\Filters\MinSubtotal;
use Sales\Tables\Filters\MinTotal;
use Sales\Tables\Filters\Observations;
use Sales\Tables\Filters\Product;
use Services\Table\Core\Repository\Classifications\CreatedClassification;
use Services\Table\Core\Repository\Classifications\IdClassification;
use Services\Table\Core\Repository\Classifications\UpdatedClassification;
use Services\Table\Core\Repository\Filters\IdFilter;
use Services\Table\Response\ResponseTable;

class Sales extends ResponseTable
{

    protected function getBuilder(): Builder
    {
        return Sale::query()->with('products');
    }

    protected function getFilters(): array
    {
        return [
            new IdFilter(),
            new Product(),
            new Observations(),
            new MinTotal(),
            new MaxTotal(),
            new MinSubtotal(),
            new MaxSubtotal(),
            new MinDiscount(),
            new MaxDiscount(),
        ];
    }

    protected function getClassifications(): array
    {
        return [
            new IdClassification(),
            new Discount(),
            new SubTotal(),
            new Total(),
            new CreatedClassification(),
            new UpdatedClassification(),
        ];
    }

    protected function getPostClassifications(): array
    {
        return [];
    }
}
