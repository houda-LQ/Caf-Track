<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }


public function store(StoreProductRequest $request)
{
    $this->authorize('create', Product::class);

    $product = Product::create($request->validated());

    return response()->json([
        "message" => "Produit créé avec succès",
        "product" => $product,
    ], 201);
}

public function update(UpdateProductRequest $request, $id)
{

    $product = Product::findOrFail($id);
    $this->authorize('update', $product);

    $product->update($request->validated());

    return response()->json([
        'message' => 'Produit mis à jour avec succès',
        'product' => $product
    ], 200);
}

public function destroy($id)
{
    $product = Product::findOrFail($id);

    $product->delete();

    return response()->json([
        'message' => 'Produit supprimé avec succès',
        'product' => $product
    ], 200);

}

//check le status de stock
 public function checkStock($id)
    {
        $product = Product::findOrFail($id);

        return response()->json([
            'product' => $product->name,
            'status' => $product->status
        ]);
    }

     public function filterByCategory($category)
    {
        $products = Product::where('category', $category)->get();

        return response()->json($products);
    }

}
