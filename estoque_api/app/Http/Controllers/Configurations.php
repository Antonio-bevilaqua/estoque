<?php

namespace App\Http\Controllers;

use App\Http\Requests\Configurations as ConfigRequest;
use App\Models\Configuration;
use Illuminate\Http\JsonResponse;

class Configurations extends Controller
{
    public function index(): JsonResponse
    {
        return $this->success(Configuration::query()->first()->toArray());
    }

    public function save(ConfigRequest $request): JsonResponse
    {
        $config = Configuration::query()->first();
        if (!$config) $config = new Configuration();

        $config->fill($request->all());
        $config->save();
        return $this->success($config->toArray());
    }
}
