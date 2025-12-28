<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->post('users', [UserController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);


// getion de produits
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::get('products/check-stock/{id}', [ProductController::class, 'checkStock']);
    Route::get('products/category/{category}', [ProductController::class, 'filterByCategory']);
});


//getion de ventes
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('sales', [SaleController::class, 'index']);
    Route::get('sales/stats', [SaleController::class, 'dashboardStats']);
    Route::post('sales', [SaleController::class, 'store']);
});

//Fournisseurs & Achats
Route::middleware('auth:sanctum')->group(function () {
Route::get('suppliers', [SupplierController::class, 'index']);      
Route::post('suppliers', [SupplierController::class, 'store']);     
Route::put('suppliers/{supplier}', [SupplierController::class, 'update']); 
Route::delete('suppliers/delete/{supplier}', [SupplierController::class, 'destroy']); 

Route::get('purchases/list', [PurchaseController::class, 'index']);     
Route::post('purchases', [PurchaseController::class, 'store']); 
});


//Gestion des Utilisateurs
Route::middleware('auth:sanctum')->group(function () {
    Route::get('users/list', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{user}', [UserController::class, 'update']);
     Route::delete('users/delete/{user}', [UserController::class, 'destroy']);
});

//  paramètres
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('settings', [SettingController::class, 'index']);
//     Route::put('settings/{setting}', [SettingController::class, 'update']);
// });


Route::middleware('auth:sanctum')->get('dashboard', [DashboardController::class, 'index']);
