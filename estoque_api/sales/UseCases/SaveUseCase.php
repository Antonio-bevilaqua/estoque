<?php

namespace Sales\UseCases;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Products\Models\Product;
use Sales\Http\Requests\SaveRequest;
use Sales\Models\Sale;
use Services\Logger\Facade\Logger;

class SaveUseCase
{
    public string $error = "";
    public function execute(SaveRequest $request, ?Sale $sale = null): ?Sale
    {
        try {
            DB::beginTransaction();
            $lastProducts = new Collection();
            if ($sale === null) {
                $sale = new Sale();
            } else {
                $lastProducts = $sale->products;
                $sale->products()->detach();
            }

            $data = [
                'subtotal' => 0,
                'discount' => str_replace(",", ".", $request->discount),
                'observations' => $request->observations ?? '',
            ];

            foreach ($request->getProducts() as $i => $product) {
                $product->stock += $this->calculateStock($product, $lastProducts, $request->quantities[$i]);
                if ($product->stock < 0) {
                    $this->error = "O produto {$product->name} não possui estoque suficiente";
                    throw new \Exception("Product {$product->name} has no stock available");
                }
                $product->save();

                $data['subtotal'] += $product->value * $request->quantities[$i];
            }
            $data['total'] = $data['subtotal'] - (float)$data['discount'];

            $sale->fill($data);
            $carbon = Carbon::createFromFormat(
                'Y-m-d H:i',
                $request->date . " " . $request->time,
                new \DateTimeZone('America/Sao_paulo')
            );
            $sale->created_at = $carbon->format("Y-m-d H:i:s");
            $sale->save();

            foreach ($request->getProducts() as $i => $product) {
                $sale->products()->attach($product->id, [
                    'quantity' => $request->quantities[$i]
                ]);
            }


            DB::commit();
            return $sale;
        } catch (\Exception $e) {
            Logger::exception($e);
            DB::rollBack();
            return null;
        }
    }

    private
    function calculateStock(Product $product, Collection $products, int $quantity)
    {
        /**
         * @var Product $p
         */
        foreach ($products as $p) {
            if ($p->id === $product->id) {
                return $p->pivot->quantity - $quantity;
            }
        }

        return -$quantity;
    }
}
