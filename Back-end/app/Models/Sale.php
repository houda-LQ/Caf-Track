<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

     protected $fillable = [
        'product_id',
        'client_name',
        'quantity',
        'unit_price',
        'total',
        'margin',
        'sale_date',
        'created_by',
    ];


     public function product()
    {
        return $this->belongsTo(Product::class);
    }

     public static function calculateTotal($unitPrice, $quantity)
    {
        return $unitPrice * $quantity;
    }

    public static function calculateMargin($marginPerUnit, $quantity)
    {
        return $marginPerUnit * $quantity;
    }
}
