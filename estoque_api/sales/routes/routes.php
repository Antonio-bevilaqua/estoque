<?php

use Illuminate\Support\Facades\Route;
use Sales\Http\Controllers\Sales;

Route::get('/', [Sales::class, 'list']);
Route::post('/', [Sales::class, 'create']);
Route::get('/{sale}', [Sales::class, 'view']);
Route::post('/{sale}', [Sales::class, 'update']);
Route::delete('/{sale}', [Sales::class, 'delete']);
