<?php

namespace Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\SendEmailJob;
use App\Models\User;
use Auth\Http\Mail\PasswordRecovery;
use Auth\Http\Requests\AuthRequest;
use Auth\Http\Requests\RecoveryRequest;
use Auth\Http\Requests\ResetRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function attempt(AuthRequest $request): JsonResponse
    {
        $user = User::query()->where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->validationError([
                'password' => "Email ou senha incorretos!"
            ]);
        }

        return $this->success([
            'token' => $user->createToken('api')->plainTextToken,
            'user' => $user
        ]);
    }

    public function recovery(RecoveryRequest $request): JsonResponse
    {
        $token = Str::uuid();
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();


        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        SendEmailJob::dispatch(
            new PasswordRecovery("Usuário", $token),
            $request->email
        );

        return $this->success(
            [
                'message' => "Um email contendo o link de redefinação da sua senha foi enviado para o seu email!"
            ]
        );
    }

    public function reset(ResetRequest $request): JsonResponse
    {
        $passRequest = DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->first();

        if (!$passRequest) {
            return $this->validationError(
                ["token" => "Ops, o token de redefinição é invalido, por favor, tente novamente."]
            );
        }

        $user = User::query()->where('email', $passRequest->email)->first();
        if (!$user) {
            return $this->validationError(
                ["token" => "Ops, o token de redefinição é invalido, por favor, tente novamente."]
            );
        }

        $user->password = Hash::make($request->password);
        $user->save();
        return $this->success([
            'message' => "Senha redefinida com sucesso!",
            'user' => $user
        ]);
    }
}
