<?php

use Illuminate\Support\Facades\Route;
use Products\Http\Controllers\Products;

Route::get('/', [Products::class, 'list']);
Route::post('/', [Products::class, 'create']);
Route::get('/all', [Products::class, 'all']);
Route::get('/{product}', [Products::class, 'view']);
Route::post('/{product}', [Products::class, 'update']);
Route::delete('/{product}', [Products::class, 'delete']);
