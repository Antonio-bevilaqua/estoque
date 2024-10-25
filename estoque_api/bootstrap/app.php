<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {
            Route::prefix("api/login")
                ->group(base_path("auth/routes/routes.php"));
            Route::prefix("api/products")
                ->middleware("auth:sanctum")
                ->group(base_path("products/routes/routes.php"));
            Route::prefix("api/expenses")
                ->middleware("auth:sanctum")
                ->group(base_path("expenses/routes/routes.php"));
            Route::prefix("api/sales")
                ->middleware("auth:sanctum")
                ->group(base_path("sales/routes/routes.php"));
            Route::prefix("api/reports")
                ->middleware("auth:sanctum")
                ->group(base_path("reports/routes/routes.php"));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
