<?php

use Illuminate\Support\Facades\Route;
use Expenses\Http\Controllers\Expenses;

Route::get('/', [Expenses::class, 'list']);
Route::post('/', [Expenses::class, 'create']);
Route::get('/{expense}', [Expenses::class, 'view']);
Route::post('/{expense}', [Expenses::class, 'update']);
Route::delete('/{expense}', [Expenses::class, 'delete']);
