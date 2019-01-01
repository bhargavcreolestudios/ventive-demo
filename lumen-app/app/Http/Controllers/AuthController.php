<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * main authentication call
     * @param  Request $request request collection
     * @return object           returns with token or unauthorized error
     */
    public function login(Request $request)
    {
        try {
            // assigning validation rules
            $rules = [
                'email'    => 'required|email|max:255|exists:users,email',
                'password' => 'required',
            ];
            // Execute validation.
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                // implode messages
                $messages = implode(" & ", $validator->messages()->all());
                return UtilityController::Generateresponse(0, $messages, Response::HTTP_BAD_REQUEST, '');
            }
            if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
                // return 401 if unauthenticated
                return UtilityController::Generateresponse(0, 'INVALID_CREDENTIALS', Response::HTTP_UNAUTHORIZED, '', 1);
            } else {
                // return with token
                return UtilityController::Generateresponse(1, '', Response::HTTP_OK, ['token' => $token], 1);
            }

        } catch (\Exception $e) {
            // return general response if something went wrong
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        }
    }
}
