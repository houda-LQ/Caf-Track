<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Purchase;

class PurchaseTest extends TestCase
{
    public function product_quantity_updates_after_purchase()
    {
        $supplier = Supplier::create([
            'name' => 'Supplier Test',
            'phone' => '0600000000',
            'email' => 'supplier@test.com',
            'address' => 'Test Address',
        ]);

        $product = Product::create([
            'name' => 'Test Product',
            'category' => 'Category 1',
            'purchase_price' => 50,
            'sale_price' => 100,
            'quantity' => 10,
            'alert' => 5,
        ]);

        Purchase::create([
            'product_id' => $product->id,
            'supplier_id' => $supplier->id,
            'quantity' => 20,
            'purchase_date' => now(),
        ]);

        // Recharger le produit
        $product->refresh();

        // Vérifier que le stock a augmenté
        $this->assertEquals(30, $product->quantity);
    }
}
