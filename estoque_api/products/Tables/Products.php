<?php

namespace Products\Tables;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Products\Models\Product;
use Products\Tables\Classifications\Created;
use Products\Tables\Classifications\Stock;
use Products\Tables\Classifications\Updated;
use Products\Tables\Classifications\Value;
use Products\Tables\Filters\Barcode;
use Products\Tables\Filters\Id;
use Products\Tables\Filters\MaxSellings;
use Products\Tables\Filters\MaxStock;
use Products\Tables\Filters\MaxValue;
use Products\Tables\Filters\MinSellings;
use Products\Tables\Filters\MinStock;
use Products\Tables\Filters\MinValue;
use Products\Tables\Filters\Name;
use Services\Table\Response\ResponseTable;

class Products extends ResponseTable
{

    protected function getBuilder(): Builder
    {
        return Product::query()
            ->select(
                'products.*',
                DB::raw("SUM(sale_products.quantity) as total_sales")
            )->leftJoin(
                'sale_products',
                'products.id',
                '=',
                'sale_products.product_id'
            )->groupBy('products.id');
    }

    protected function getFilters(): array
    {
        return [
            new Id(),
            new Name(),
            new MinStock(),
            new MaxStock(),
            new MinValue(),
            new MaxValue(),
            new Barcode(),
            new MinSellings(),
            new MaxSellings()
        ];
    }

    protected function getClassifications(): array
    {
        return [
            new \Products\Tables\Classifications\Id(),
            new \Products\Tables\Classifications\Name(),
            new Stock(),
            new Value(),
            new Created(),
            new Updated(),
        ];
    }

    protected function getPostClassifications(): array
    {
        return [];
    }
}
