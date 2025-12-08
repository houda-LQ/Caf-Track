<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Http\Requests\PurchaseRequest;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with(['product', 'supplier'])->get();
        return response()->json($purchases);
    }

    public function store(PurchaseRequest $request)
    {
        $purchase = Purchase::create($request->validated());
        return response()->json($purchase, 201);
    }

   

   
}
