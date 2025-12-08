<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Sale;
use App\Models\Supplier;
use App\Models\User;
use App\Policies\SalePolicy;
use App\Policies\SupplierPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
    User::class => UserPolicy::class,
    Sale::class => SalePolicy::class,
    Supplier::class => SupplierPolicy::class,


    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
    }
}
