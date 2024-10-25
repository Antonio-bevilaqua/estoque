<?php

namespace App\Http\Controllers;

use Expenses\Models\Expense;
use Illuminate\Http\JsonResponse;
use Products\Models\Product;
use Sales\Models\Sale;

class Dashboard extends Controller
{
    public function index(): JsonResponse
    {
        return $this->success([
            'total_products' => Product::query()->count(),
            'total_sales' => Sale::query()->count(),
            'total_earnings' => Sale::query()->sum('total'),
            'total_expenses' => Expense::query()->sum('value'),
        ]);
    }
}
