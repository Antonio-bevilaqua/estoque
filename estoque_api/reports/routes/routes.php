<?php

use Illuminate\Support\Facades\Route;
use Reports\Http\Controllers\DRE;


Route::get('/dre', [DRE::class, 'generate']);
