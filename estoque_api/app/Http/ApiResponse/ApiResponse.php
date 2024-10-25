<?php

namespace App\Http\ApiResponse;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ApiResponse
{
    private ApiResponseType $responseType;
    private array $data;

    public static function throw(string $key, string $message): void
    {
        throw new HttpResponseException(
            ApiResponse::send(
                ApiResponseType::ERROR,
                [$key => $message],
            )
        );
    }

    public static function error(array $data): void
    {
        throw new HttpResponseException(
            ApiResponse::send(
                ApiResponseType::ERROR,
                $data,
            )
        );
    }

    public static function send(
        ApiResponseType $responseType,
        ?array          $data = null
    ): JsonResponse
    {
        return (new self($responseType))->sendResponse($data);
    }

    public static function message(
        ApiResponseType $responseType,
        ?string         $message = null
    ): JsonResponse
    {
        return (new self($responseType))->sendResponse([
            'message' => $message
        ]);
    }

    public function __construct(ApiResponseType $responseType)
    {
        $this->responseType = $responseType;
        $this->data = [];
    }

    private function sendResponse(?array $data = null): JsonResponse
    {
        if ($data !== null) {
            $this->setData($data);
        }

        return response()->json([
            'type' => $this->responseType->name,
            'data' => $this->data
        ], $this->responseType->value);
    }

    /**
     * @param array $data
     * @return ApiResponse
     */
    public function setData(array $data): ApiResponse
    {
        $this->data = $data;
        return $this;
    }
}
