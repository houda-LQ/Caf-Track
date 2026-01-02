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

    // Filtrer par utilisateur si employé
    if ($user->role === 'employe') {
        $query->where('created_by', $user->id);
    }

    // Filtrer selon la période
    $period = $request->query('period', 'all');

    if ($period === 'today') {
        $query->whereDate('sale_date', now());
    } elseif ($period === 'week') {
        $query->whereBetween('sale_date', [now()->startOfWeek(), now()->endOfWeek()]);
    } elseif ($period === 'month') {
        $query->whereMonth('sale_date', now()->month)
              ->whereYear('sale_date', now()->year);
    }

    $sales = $query->get();

    return response()->json($sales, 200);
}


public function store(StoreSaleRequest $request)
{
    $user = auth()->user();
    $this->authorize('create', Sale::class);

    $data = $request->validated();

    $product = Product::findOrFail($data['product_id']);

    $total = $product->sale_price * $data['quantity'];
    $margin = $product->margin * $data['quantity'];

    if ($data['quantity'] > $product->quantity) {
        return response()->json([
            'message' => 'Quantité insuffisante en stock'
        ], 400);
    }

    $sale = Sale::create([
        'product_id'  => $data['product_id'],
        'client_name' => $data['client_name'],
        'quantity'    => $data['quantity'],
        'unit_price'  => $product->sale_price,
        'total'       => $total,
        'margin'      => $margin,
        'sale_date'   => now(),
        'created_by'  => $user->id,
    ]);

    $product->quantity -= $data['quantity'];
    $product->save();

    return response()->json([
        'message' => 'Vente créée avec succès',
        'sale' => $sale
    ], 201);
}



public function dashboardStats(Request $request)
{
    $user = auth()->user();
    $query = Sale::query();

    if ($user->role === 'employe') {
        $query->where('created_by', $user->id);
    }

    $period = $request->query('period', 'all');

    if ($period === 'today') {
        $query->whereDate('sale_date', now());
    } elseif ($period === 'week') {
        $query->whereBetween('sale_date', [now()->startOfWeek(), now()->endOfWeek()]);
    } elseif ($period === 'month') {
        $query->whereMonth('sale_date', now()->month)
              ->whereYear('sale_date', now()->year);
    }

    return response()->json([
        'nombre_ventes' => $query->count(),
        'chiffre_affaires' => $query->sum('total'),
        'benefice_net' => $query->sum('margin'),
    ], 200);
}

}
