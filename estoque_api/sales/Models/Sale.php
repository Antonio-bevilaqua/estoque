<?php

namespace Sales\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Products\Models\Product;

/**
 * @property float subtotal
 * @property float discount
 * @property float total
 * @property ?string observations
 * @property Collection<int, Product> $products
 * @property string|Carbon created_at
 * @property string|Carbon updated_at
 */
class Sale extends Model
{
    protected $fillable = [
        'subtotal',
        'discount',
        'total',
        'observations',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(
            Product::class,
            'sale_products',
            'sale_id',
            'product_id'
        )->withPivot('quantity');
    }

    public function delete(): bool
    {
        $this->products()->detach();
        return parent::delete();
    }
}
