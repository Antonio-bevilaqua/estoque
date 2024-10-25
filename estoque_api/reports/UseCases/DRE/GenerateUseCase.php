<?php

namespace Reports\UseCases\DRE;

use Expenses\Models\Expense;
use Illuminate\Database\Eloquent\Collection;
use Products\Models\Product;
use Sales\Models\Sale;

class GenerateUseCase
{
    private array $result = [];

    public function execute(GenerateDTO $DTO): array
    {
        $this->reset();
        $sales = Sale::query()->with('products')
            ->whereBetween('created_at', [
                $DTO->initialDate->format('Y-m-d H:i:s'),
                $DTO->finalDate->format('Y-m-d H:i:s')
            ])->get();

        $expenses = Expense::query()->whereBetween('created_at', [
            $DTO->initialDate->format('Y-m-d H:i:s'),
            $DTO->finalDate->format('Y-m-d H:i:s')
        ])->get();

        $this->formatExpenses($expenses);
        $this->formatSales($sales);
        $productsArray = [];
        foreach ($this->result['products'] as $product) {
            $productsArray[] = $product;
        }
        $this->result['products'] = $productsArray;
        return $this->result;
    }

    private function reset(): void
    {
        $this->result = [
            'sales' => [],
            'products' => [],
            'expenses' => [],
            'subtotal_value' => 0,
            'discount_value' => 0,
            'expenses_value' => 0,
            'total_value' => 0,
        ];
    }

    /**
     * @param Collection<int, Expense> $expenses
     * @return void
     */
    private function formatExpenses(Collection $expenses): void
    {
        foreach ($expenses as $expense) {
            $this->result['expenses'][] = $expense;
            $this->result['expenses_value'] += $expense->value;
        }
    }

    /**
     * @param Collection<int, Sale> $sales
     * @return void
     */
    private function formatSales(Collection $sales): void
    {
        foreach ($sales as $sale) {
            $this->result['sales'][] = $sale;
            $this->formatSaleProducts($sale->products);
            $this->result['subtotal_value'] += $sale->subtotal;
            $this->result['total_value'] += $sale->total;
            $this->result['discount_value'] += $sale->discount;
        }
    }

    /**
     * @param Collection<int, Product> $products
     * @return void
     */
    private function formatSaleProducts(Collection $products): void
    {
        foreach ($products as $product) {
            if (!isset($this->result['products'][$product->id])) {
                $this->result['products'][$product->id] = $product->toArray();
                unset($this->result['products'][$product->id]['pivot']);
                $this->result['products'][$product->id]['quantity'] = $product->pivot->quantity;
                continue;
            }

            $this->result['products'][$product->id]['quantity'] += $product->pivot->quantity;
        }
    }
}
