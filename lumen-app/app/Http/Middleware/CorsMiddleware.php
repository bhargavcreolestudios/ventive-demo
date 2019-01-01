<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class CorsMiddleware extends BaseMiddleware
{

    public function handle($request, Closure $next)
    {
        ## check if user is not locked or not
        $this->InterceptLockedUser($request);
        // TODO: Should check whether route has been registered
        if ($this->isPreflightRequest($request)) {
            $response = $this->createEmptyResponse();
        } else {
            $response = $next($request);
        }
        // return $response;

        return $this->addCorsHeaders($request, $response);
    }

    /**
     * Determine if request is a preflight request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return bool
     */
    protected function isPreflightRequest($request)
    {
        return $request->isMethod('OPTIONS');
    }

    /**
     * Create empty response for preflight request.
     *
     * @return \Illuminate\Http\Response
     */
    protected function createEmptyResponse()
    {
        return new Response(null, 204);
    }

    /**
     * Add CORS headers.
     *
     * @param \Illuminate\Http\Request  $request
     * @param \Illuminate\Http\Response $response
     */
    protected function addCorsHeaders($request, $response)
    {
        foreach ([
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Max-Age'           => (60 * 60 * 24),
            'Access-Control-Allow-Headers'     => $request->header('Access-Control-Request-Headers'),
            'Access-Control-Allow-Methods'     => $request->header('Access-Control-Request-Methods')
            ?: 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Credentials' => 'true',
        ] as $header => $value) {
            $response->header($header, $value);
        }
        return $response;
    }
    /**
     * Validating request wether parsed token is valid or not
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return
     */
    private function InterceptLockedUser($request)
    {
        try {
            ## get token
            $token = JWTAuth::getToken();
            if (isset($token) && !empty($token)) {
                ## if token is available, parse it
                $parsedToken = JWTAuth::parseToken();
            } else {
                return true;
            }

        }
        ## If token has expired...
         catch (TokenExpiredException $e) {
            try {
                ## Try to refresh token
                $token = JWTAuth::refresh($token);
                JWTAuth::setToken($token);

                ## Authenticate with new token, save user on request
                $request->user = JWTAuth::authenticate($token);
            }

            ## If token refresh period has expired...
             catch (TokenExpiredException $e) {
                abort(401, $e->getMessage());
            }
            ## if token is blacklisted
             catch (TokenBlacklistedException $e) {
                abort(401, $e->getMessage());
            }
        } catch (JWTException $e) {
            ## if token is not parsed properly
            abort(401, $e->getMessage());
        }
        ## try to verify token
        try {
            ## If sucessful, save user on request
            $request->user = JWTAuth::authenticate($token);
        } catch (TokenBlacklistedException $e) {
            abort(401, $e->getMessage());
        }
    }

}
