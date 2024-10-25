<?php

use Auth\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post("/", [AuthController::class, "attempt"]);
Route::post("/recovery", [AuthController::class, "recovery"]);
Route::post("/reset", [AuthController::class, "reset"]);
