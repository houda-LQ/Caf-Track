<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Purchase;

class PurchasePolicy
{
    /**
     * Voir la liste des achats
     */
    public function viewAny(User $user)
    {
    }

    /**
     * Créer un achat
     */
    public function create(User $user)
    {
        return $user->role === 'admin';
    }

    /**
     */
    public function update(User $user, Purchase $purchase)
    {
       
    }

    /**
     */
    public function delete(User $user, Purchase $purchase)
    {
    }
}
