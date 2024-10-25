<?php

namespace Products\UseCases;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Products\Http\Requests\SaveRequest;
use Products\Models\Product;

class SaveUseCase
{
    public function execute(SaveRequest $request, ?Product $product = null): Product
    {
        if (!$product) {
            $product = new Product();
        }

        $data = $request->all();
        $data['value'] = str_replace(',', '.', $data['value']);
        $product->fill($data);
        $picture = $this->getPictureName($request);
        if ($picture) $this->updateProductPicture($product, $picture);
        $product->save();

        return $product;
    }

    private function getPictureName(SaveRequest $request): ?string
    {
        $file = $request->file('picture');
        if (!$file) return null;

        $fileName = Str::orderedUuid() . '.' . $file->getClientOriginalExtension();
        Storage::disk('public')
            ->putFileAs("/", $file, $fileName);
        return $fileName;
    }

    public function updateProductPicture(Product $product, string $picture): void
    {
        if ($product->picture) Storage::disk('public')->delete($product->picture);
        $product->picture = $picture;
    }
}
