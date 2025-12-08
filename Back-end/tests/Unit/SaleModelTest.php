<?php

namespace Tests\Unit;

use App\Models\Sale;
use PHPUnit\Framework\TestCase;

class SaleModelTest extends TestCase
{
   
    public function it_calculates_total_correctly()
    {
        $unitPrice = 50;
        $quantity = 3;

        $total = Sale::calculateTotal($unitPrice, $quantity);

        $this->assertEquals(150, $total);
    }

   
    public function it_calculates_margin_correctly()
    {
        $marginPerUnit = 10;
        $quantity = 4;

        $margin = Sale::calculateMargin($marginPerUnit, $quantity);

        $this->assertEquals(40, $margin);
    }
}