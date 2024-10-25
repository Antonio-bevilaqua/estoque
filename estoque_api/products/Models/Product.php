<?php

namespace Products\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;
use Sales\Models\Sale;

/**
 * @property int id
 * @property string uuid
 * @property ?string barcode
 * @property string name
 * @property ?string description
 * @property ?string picture
 * @property float value
 * @property int stock
 * @property Collection<int, Sale> $sales
 */
class Product extends Model
{
    protected $fillable = [
        'uuid',
        'barcode',
        'name',
        'description',
        'value',
        'stock',
    ];

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            $product->uuid = Str::uuid();
        });
    }

    public function sales(): BelongsToMany
    {
        return $this->belongsToMany(
            Sale::class,
            'sale_products',
            'product_id',
            'sale_id'
        )->withPivot('quantity');
    }
}
