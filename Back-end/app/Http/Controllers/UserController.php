<?php

namespace App\Http\Controllers;

use App\Events\EmployeCreated;
use App\Http\Requests\StoreEmployeRequest;
use App\Http\Requests\UpdateUserRequest;
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
        'role' => $request->role ?? 'employe'
    ]);

        event(new EmployeCreated($user));

    return response()->json([
        'message' => 'Employé créé avec succès',
        'user' => $user
    ], 201);
}


 public function index()
    {
        $this->authorize('viewAny', User::class);

        $users = User::all();

        // Compter les totaux
        $totalUsers = User::count();
        $totalAdmins = User::where('role', 'admin')->count();
        $totalEmployees = User::where('role', 'employe')->count();

        return response()->json([
            'users' => $users,
            'totals' => [
                'total_users' => $totalUsers,
                'admins' => $totalAdmins,
                'employees' => $totalEmployees
            ]
        ]);
    }


   public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $user->update($request->only(['name', 'email', 'role']));

        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès',
            'user' => $user
        ]);
    }




    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

}
