<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        //ventes (filtrage employé)
        $salesQuery = Sale::query();

        if ($user->role === 'employe') {
            $salesQuery->where('created_by', $user->id);
        }
       
        // Ventes du jour
        $ventesJour = (clone $salesQuery)
            ->whereDate('sale_date', today())
            ->sum('total');

        $beneficeJour = (clone $salesQuery)
            ->whereDate('sale_date', today())
            ->sum('margin');

        // Ventes du mois
        $ventesMois = (clone $salesQuery)
            ->whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->sum('total');

        $beneficeMois = (clone $salesQuery)
            ->whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->sum('margin');

        // Bénéfice net + marge
        $chiffreAffaires = (clone $salesQuery)->sum('total');
        $beneficeNet = (clone $salesQuery)->sum('margin');
        $marge = $chiffreAffaires > 0 ? round(($beneficeNet / $chiffreAffaires) * 100, 2) : 0;

        // Alertes stock (nombre)
        $alertesStockCount = Product::whereColumn('quantity', '<=', 'alert')->count();

       

        // Ventes par catégorie (Pie)
        $ventesParCategorie = Sale::join('products', 'sales.product_id', '=', 'products.id')
            ->select(
                'products.category',
                DB::raw('SUM(sales.total) as total')
            )
            ->when($user->role === 'employe', function ($q) use ($user) {
                $q->where('sales.created_by', $user->id);
            })
            ->groupBy('products.category')
            ->get();

        // Évolution ventes 7 derniers jours (Line)
        $evolutionVentes = Sale::select(
                DB::raw('DATE(sale_date) as date'),
                DB::raw('SUM(total) as ventes'),
                DB::raw('SUM(margin) as benefice')
            )
            ->when($user->role === 'employe', function ($q) use ($user) {
                $q->where('created_by', $user->id);
            })
            ->where('sale_date', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top 5 produits les plus vendus (Bar)
        $topProduits = Sale::join('products', 'sales.product_id', '=', 'products.id')
            ->select(
                'products.name',
                DB::raw('SUM(sales.total) as chiffre_affaires')
            )
            ->when($user->role === 'employe', function ($q) use ($user) {
                $q->where('sales.created_by', $user->id);
            })
            ->groupBy('products.name')
            ->orderByDesc('chiffre_affaires')
            ->limit(5)
            ->get();

       
        //stocks Faibles

        $stocksFaibles = Product::whereColumn('quantity', '<=', 'alert')
            ->select('name', 'category', 'quantity', 'alert')
            ->get();

        return response()->json([
            'cards' => [
                'ventesJour' => [
                    'total' => $ventesJour,
                    'benefice' => $beneficeJour
                ],
                'ventesMois' => [
                    'total' => $ventesMois,
                    'benefice' => $beneficeMois
                ],
                'beneficeNet' => [
                    'total' => $beneficeNet,
                    'marge' => $marge
                ],
                'alertesStock' => $alertesStockCount
            ],
            'charts' => [
                'ventesParCategorie' => $ventesParCategorie,
                'evolutionVentes' => $evolutionVentes,
                'topProduits' => $topProduits
            ],
            'stocksFaibles' => $stocksFaibles
        ], 200);
    }
}
