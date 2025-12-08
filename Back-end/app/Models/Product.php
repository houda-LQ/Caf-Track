<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'category',
        'purchase_price',
        'sale_price',
        'quantity',
        'alert',
    ];

     protected $appends = ['status','margin'];



    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }


//Affiche status du prod
    public function getStatusAttribute()
   {
    if ($this->quantity <= $this->alert) {
        return 'Stock faible';
    }

    return 'En stock';
  }

  //calcule margin
  public function getMarginAttribute()
{
    return $this->sale_price - $this->purchase_price;
}

// Décrémenter le stock
public function decrementStock($quantity)
{
    $this->quantity -= $quantity;
    $this->save();
}


}
