<?php

namespace App\Traits;

use App\Http\ApiResponse\ApiResponse;
use App\Http\ApiResponse\ApiResponseType;
use Illuminate\Http\JsonResponse;
use Services\Logger\Facade\Logger;

trait HasJsonResponses
{
    protected function notFound(): JsonResponse
    {
        return ApiResponse::send(ApiResponseType::NOT_FOUND);
    }

    protected function forbidden(): JsonResponse
    {
        return ApiResponse::send(ApiResponseType::FORBIDDEN);
    }

    protected function error(string $error): JsonResponse
    {
        return ApiResponse::message(
            ApiResponseType::ERROR,
            $error
        );
    }

    protected function message(ApiResponseType $type, string $message): JsonResponse
    {
        return ApiResponse::message(
            $type,
            $message
        );
    }

    protected function validationError(array $errors): JsonResponse
    {
        return ApiResponse::send(
            ApiResponseType::ERROR,
            $errors
        );
    }

    protected function success(array $data, ?string $message = null): JsonResponse
    {
        $this->addMessageToData($data, $message);
        return ApiResponse::send(
            ApiResponseType::SUCCESS,
            $data
        );
    }

    protected function created(array $data, ?string $message = null): JsonResponse
    {
        $this->addMessageToData($data, $message);
        return ApiResponse::send(
            ApiResponseType::CREATED,
            $data
        );
    }

    protected function updated(array $data, ?string $message = null): JsonResponse
    {
        $this->addMessageToData($data, $message);
        return ApiResponse::send(
            ApiResponseType::UPDATED,
            $data
        );
    }

    protected function deleted(?string $message = null): JsonResponse
    {

        $data = [];
        if ($message !== null) {
            $this->addMessageToData($data, $message);
        }

        return ApiResponse::send(
            ApiResponseType::UPDATED,
            $data
        );
    }

    private function addMessageToData(array &$data, ?string $message = null): void
    {
        if ($message !== null) {
            $data['message'] = $message;
        }
    }

    protected function internalServerError($e): JsonResponse
    {
        Logger::exception($e);
        return $this->internalError();
    }

    private function internalError(): JsonResponse
    {
        return ApiResponse::send(ApiResponseType::INTERNAL_ERROR);
    }
}
