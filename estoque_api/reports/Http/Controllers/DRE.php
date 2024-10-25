<?php

namespace Reports\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Reports\Http\Requests\DREReportRequest;
use Reports\UseCases\DRE\GenerateUseCase;

class DRE extends Controller
{
    public function generate(DREReportRequest $request, GenerateUseCase $useCase): JsonResponse
    {
        return $this->success(
            $useCase->execute($request->getDTO())
        );
    }
}
