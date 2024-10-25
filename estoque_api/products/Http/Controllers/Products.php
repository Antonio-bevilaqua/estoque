<?php

namespace Products\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Products\Http\Requests\SaveRequest;
use Products\Models\Product;
use Products\Tables\Products as ProductsTable;
use Products\UseCases\SaveUseCase;

class Products extends Controller
{
    public function list(Request $request): JsonResponse
    {
        return $this->success(
            (new ProductsTable($request))->toArray()
        );
    }

    public function all(): JsonResponse
    {
        return $this->success(
            Product::query()
                ->get()
                ->toArray()
        );
    }

    public function view(int $product): JsonResponse
    {
        $product = Product::query()->findOrFail($product);
        return $this->success(
            $product->toArray()
        );
    }

    public function create(SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {
        return $this->success(
            $useCase->execute($request)->toArray()
        );
    }

    public function update(int $product, SaveRequest $request, SaveUseCase $useCase): JsonResponse
    {
        $product = Product::query()->findOrFail($product);
        return $this->success(
            $useCase->execute($request, $product)->toArray()
        );
    }

    public function delete(int $product): JsonResponse
    {
        $product = Product::query()->findOrFail($product);
        if ($product->sales()->exists()) {
            $this->error("Este produto não pode ser removido pois existem vendas atreladas a ele!");
        }

        if ($product->delete()) {
            return $this->success([
                "product" => "produto removido com sucesso!"
            ]);
        }

        return $this->error("Falha ao remover o produto, tente novamente mais tarde");
    }
}
