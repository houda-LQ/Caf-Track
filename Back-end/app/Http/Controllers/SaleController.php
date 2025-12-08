<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{


    public function index(Request $request)
{
    
     $user = auth()->user();

     $this->authorize('viewAny', Sale::class);

    $query = Sale::with('product')->orderBy('sale_date', 'desc');

     // Filtrer les ventes selon chaue employe
     if ($user->role === 'employe') {
        $query->where('created_by', $user->id);
    }

    if ($request->has('from') && $request->has('to')) {
        $query->whereBetween('sale_date', [$request->from, $request->to]);
    }

    $sales = $query->get();

    return response()->json($sales, 200);
}


public function dashboardStats(Request $request)
{
    $user = auth()->user();

    $query = Sale::query();
    
    if ($user->role === 'employe') {
    $query->where('created_by', $user->id);
}
    if ($request->has('from') && $request->has('to')) {
        $query->whereBetween('sale_date', [$request->from, $request->to]);
    }

    return response()->json([
        'nombre_ventes' => $query->count(),
        'chiffre_affaires' => $query->sum('total'),
        'benefice_net' => $query->sum('margin'),
    ], 200);
}



 public function store(StoreSaleRequest $request)
{

    $this->authorize('create', Sale::class);

    $product = Product::findOrFail($request->product_id);

    $total = Sale::calculateTotal($product->sale_price, $request->quantity);
    $margin = Sale::calculateMargin($product->margin, $request->quantity);

    $sale = Sale::create([
        'product_id' => $product->id,
        'client_name' => $request->client_name,
        'quantity' => $request->quantity,
        'unit_price' => $product->sale_price,
        'total' => $total,
        'margin' => $margin,
        'sale_date' => now()->toDateString(),
        'created_by' => auth()->id(),
    ]);

    $product->decrementStock($request->quantity);

    return response()->json([
        'message' => 'Vente enregistrée avec succès',
        'sale' => $sale
    ], 201);
    }

}
