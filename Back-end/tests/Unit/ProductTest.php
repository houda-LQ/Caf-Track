<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Product;

class ProductTest extends TestCase
{
    /**
     * A basic unit test example.
     */
      public function it_calculates_margin_correctly()
    {
        $product = new Product([
            'purchase_price' => 50,
            'sale_price' => 80,
        ]);

        // Vérifie que la marge est correcte
        $this->assertEquals(30, $product->margin);
    }

    public function it_returns_status_correctly()
    {
        // Cas stock faible
        $product = new Product([
            'quantity' => 5,
            'alert' => 10,
        ]);
        $this->assertEquals('Stock faible', $product->status);

        // Cas en stock
        $product->quantity = 15;
        $this->assertEquals('En stock', $product->status);
    }
}
