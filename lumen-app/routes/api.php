<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
 */

$api = $app->make(Dingo\Api\Routing\Router::class);

$api->version('v1', function ($api) {

    $api->group(['prefix' => 'auth', 'namespace' => 'App\Http\Controllers'], function ($api) {
        $api->post('/login', ['uses' => 'AuthController@login', 'as' => 'api.user.login']);

    });

    $api->group(['prefix' => 'product', 'middleware' => 'api.auth', 'namespace' => 'App\Http\Controllers'], function ($api) {
        $api->get('/', ['uses' => 'ProductsController@index', 'as' => 'api.product.list']);
        $api->get('/{id}', ['uses' => 'ProductsController@show', 'as' => 'api.product.single']);
        $api->post('/create', ['uses' => 'ProductsController@create', 'as' => 'api.product.create']);
        $api->post('/update', ['uses' => 'ProductsController@update', 'as' => 'api.product.update']);
        $api->delete('/delete/{id}', ['uses' => 'ProductsController@destroy', 'as' => 'api.product.delete']);

    });
    $api->group(['prefix' => 'category', 'middleware' => 'api.auth', 'namespace' => 'App\Http\Controllers'], function ($api) {
        $api->get('/', ['uses' => 'CategoriesController@index', 'as' => 'api.category.list']);
    });
});
