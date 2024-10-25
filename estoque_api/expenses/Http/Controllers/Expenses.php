<?php

namespace Expenses\Http\Controllers;

use App\Http\Controllers\Controller;
use Expenses\Http\Requests\SaveRequest;
use Expenses\Models\Expense;
use Expenses\Tables\Expenses as ExpensesTable;
use Expenses\UseCases\SaveUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Expenses extends Controller
{
    public function list(Request $request): JsonResponse
    {
        return $this->success(
            (new ExpensesTable($request))->toArray()
        );
    }

    public function view(int $expense): JsonResponse
    {
        $expense = Expense::query()->findOrFail($expense);
        return $this->success(
            $expense->toArray()
        );
    }

    public function create(SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {
        return $this->success(
            $useCase->execute($request)->toArray()
        );
    }

    public function update(int $expense, SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {

        $expense = Expense::query()->findOrFail($expense);
        return $this->success(
            $useCase->execute($request, $expense)->toArray()
        );
    }

    public function delete(int $expense): JsonResponse
    {

        $expense = Expense::query()->findOrFail($expense);
        if ($expense->delete()) {
            return $this->success([
                "product" => "despesa removida com sucesso!"
            ]);
        }

        return $this->error("Falha ao remover a despesa, tente novamente mais tarde");
    }
}
