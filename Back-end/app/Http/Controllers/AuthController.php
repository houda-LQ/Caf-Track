<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  
    public function login (LoginRequest $request){

        if (!Auth::attempt($request->only("email","password"))){
          return response()->json([
             "message" => "Email ou mot de passe incorrect"
          ],401);
        }

       $user = User::where("email", $request->email)->firstOrFail();
        $token = $user->createToken("auth_token")->plainTextToken; 

         return response()->json([
            "message" => "Connexion réussie",
            "user" => $user,
            "token" => $token
        ], 200);
    }

      public function logout(){
       auth()->user()->currentAccessToken()->delete();
        return response()->json(["message"=>"Déconnexion réussie",
                                
     ]);

    }
}
