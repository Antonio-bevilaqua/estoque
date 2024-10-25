<?php

namespace App\Http\Requests;

use App\Http\ApiResponse\ApiResponse;
use App\Http\ApiResponse\ApiResponseType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator;

abstract class GetFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    abstract public function rules(): array;

    public function all($keys = null): array
    {
        $params = parent::all();
        foreach ($this->keys() as $key) {
            $params[$key] = $this->input($key);
        }

        return $params;
    }


    public function validateResolved(): void
    {
        $validator = Validator::make(
            $this->all(),
            $this->rules(),
            $this->messages(),
            $this->attributes()
        );

        if ($validator->fails()) {
            $this->throwError($validator->errors()->toArray());
        }
    }

    protected function throwError(array $data): void
    {
        throw new HttpResponseException(
            ApiResponse::send(
                ApiResponseType::ERROR,
                $data,
            )
        );
    }
}
