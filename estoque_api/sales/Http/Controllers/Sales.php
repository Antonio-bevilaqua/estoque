<?php

namespace Sales\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Sales\Http\Requests\SaveRequest;
use Sales\Models\Sale;
use Sales\Tables\Sales as SalesTable;
use Sales\UseCases\SaveUseCase;

class Sales extends Controller
{
    public function list(Request $request): JsonResponse
    {
        return $this->success(
            (new SalesTable($request))->toArray()
        );
    }

    public function view(int $sale): JsonResponse
    {
        $sale = Sale::query()->with('products')->findOrFail($sale);
        return $this->success(
            $sale->toArray()
        );
    }

    public function create(SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {
        $data = $useCase->execute($request);
        if (!$data) return $this->error($useCase->error !== "" ?
            $useCase->error
            : "Falha ao atualizar a venda, contate o suporte"
        );

        return $this->success(
            $data->toArray()
        );
    }

    public function update(int $sale, SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {
        $sale = Sale::query()->findOrFail($sale);
        $data = $useCase->execute($request, $sale);
        if (!$data) {
            return $this->error($useCase->error !== "" ?
                $useCase->error
                : "Falha ao atualizar a venda, contate o suporte"
            );
        }

        return $this->success(
            $data->toArray()
        );
    }

    public function delete(int $sale): JsonResponse
    {
        $sale = Sale::query()->findOrFail($sale);
        if ($sale->delete()) {
            return $this->success([
                "product" => "venda removida com sucesso!"
            ]);
        }

        return $this->error("Falha ao remover a venda, tente novamente mais tarde");
    }
}
