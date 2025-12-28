<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Http\Requests\PurchaseRequest;
use App\Models\Product;

class PurchaseController extends Controller
{
   public function index()
{
     $purchases = Purchase::with(['product', 'supplier'])
        ->orderBy('purchase_date', 'desc')
        ->get();

    return response()->json($purchases);
}

public function store(PurchaseRequest $request)
{
    $this->authorize('create', Purchase::class);

    $purchase = Purchase::create($request->validated());

    return response()->json(
        $purchase->load(['product', 'supplier']),
        201
    );
}



   

   
}
