<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'supplier_id',
        'quantity',
        'purchase_date',
    ];

    public function product() {
    return $this->belongsTo(Product::class);
}
public function supplier() {
    return $this->belongsTo(Supplier::class);
}


// Mise à jour automatique de la quantité du produit après création d'achat
    protected static function booted()
    {
        static::created(function ($purchase) {
            $product = $purchase->product;
            $product->quantity += $purchase->quantity; 
            $product->save();
        });
    }
}
