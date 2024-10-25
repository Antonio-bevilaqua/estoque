<?php

use App\Http\Controllers\Configurations;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\Users;
use Illuminate\Support\Facades\Route;


Route::post('/support', [SupportController::class, "send"]);

Route::middleware("auth:sanctum")
    ->group(function () {
        Route::get('/dashboard', [Dashboard::class, "index"]);

        Route::prefix('user')
            ->group(function () {
                Route::get('/', [Users::class, "index"]);
                Route::post('/', [Users::class, "update"]);
                Route::post('/password', [Users::class, "updatePassword"]);
            });

        Route::prefix('configurations')
            ->group(function () {
                Route::get('/', [Configurations::class, "index"]);
                Route::post('/', [Configurations::class, "save"]);
            });
    });


