<?php

namespace Sales\Http\Requests;

use App\Http\Requests\JsonFormRequest;
use App\Http\Rules\MoneyRule;
use Illuminate\Database\Eloquent\Collection;
use Products\Models\Product;
use Sales\Http\Rules\StockRule;

/**
 * @property int[] products
 * @property int[] quantities
 * @property string discount
 * @property ?string observations
 * @property string date
 * @property string time
 */
class SaveRequest extends JsonFormRequest
{
    private ?Collection $productsCollection = null;

    public function rules(): array
    {
        return [
            'products' => [
                'required',
                'array',
            ],
            'products.*' => [
                'required',
                'numeric',
                'exists:products,id',
            ],
            'quantities' => [
                'required',
                'array',
            ],
            'quantities.*' => [
                'required',
                'numeric',
                'min:1',
            ],
            'discount' => [
                'required',
                new MoneyRule(),
            ],
            'observations' => [
                'nullable',
                'string',
                'max:250'
            ],
            'date' => [
                'required',
                'date_format:Y-m-d'
            ],
            'time' => [
                'required',
                'date_format:H:i'
            ]
        ];
    }


    /**
     * @return Collection<int, Product>|null
     */
    public function getProducts(): ?Collection
    {
        if ($this->productsCollection !== null) {
            return $this->productsCollection;
        }
        $this->productsCollection = Product::query()
            ->whereIn('id', $this->products)
            ->get();
        return $this->productsCollection;
    }
}
