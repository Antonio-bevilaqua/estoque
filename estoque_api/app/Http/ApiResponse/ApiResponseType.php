<?php

namespace App\Http\ApiResponse;

enum ApiResponseType: int
{
    case SUCCESS = 200;
    case CREATED = 201;
    case UPDATED = 204;
    case ERROR = 400;
    case FORBIDDEN = 403;
    case NOT_FOUND = 404;
    case INTERNAL_ERROR = 500;
}
