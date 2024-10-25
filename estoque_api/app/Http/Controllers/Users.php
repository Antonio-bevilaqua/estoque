<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordUpdate;
use App\Http\Requests\UserUpdate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Users extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->success(
            $request->user()->toArray()
        );
    }

    public function update(UserUpdate $request): JsonResponse
    {
        $user = $request->user();
        $user->fill($request->all());
        $user->save();

        return $this->success(
            $user->toArray()
        );
    }

    public function updatePassword(PasswordUpdate $request): JsonResponse
    {
        $user = $request->user();
        $user->password = Hash::make($request->password);
        $user->save();

        return $this->success(
            $user->toArray()
        );
    }
}
