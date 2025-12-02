<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(StoreEmployeRequest $request)
{
    $this->authorize('create', User::class);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'employe',
    ]);

    return response()->json([
        'message' => 'Employé créé avec succès',
        'user' => $user
    ], 201);
}

}
