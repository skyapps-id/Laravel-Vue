<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@register');
    Route::post('/logout', 'AuthController@logout');
    Route::post('/refresh', 'AuthController@refresh');
    Route::get('/user-profile', 'AuthController@userProfile');    
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'master'
], function ($router) {
    Route::post('/event', 'EventController@store');
    Route::get('/events', 'EventController@index');
    Route::get('/event/{id}', 'EventController@getEvent');
    Route::put('/event/{id}', 'EventController@update');
    Route::delete('/event/{id}', 'EventController@delete');

    Route::post('/status', 'EventStatusController@store');
    Route::get('/statuses', 'EventStatusController@index');
    Route::get('/status/{id}', 'EventStatusController@getStatus');
    Route::put('/status/{id}', 'EventStatusController@update');
    Route::delete('/status/{id}', 'EventStatusController@delete');

    Route::post('/designer', 'DesignersController@store');
    Route::get('/designers', 'DesignersController@index');
    Route::get('/designer/{id}', 'DesignersController@getDesigners');
    Route::put('/designer/{id}', 'DesignersController@update');
    Route::delete('/designer/{id}', 'DesignersController@delete');

    Route::post('/person', 'PersonController@store');
    Route::get('/persons', 'PersonController@index');
    Route::get('/person/{id}', 'PersonController@getPerson');
    Route::put('/person/{email}', 'PersonController@update');
    Route::delete('/person/{id}', 'PersonController@delete');
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'event'
], function ($router) {
    Route::post('/register', 'EventRegisterController@store');
    Route::get('/registers', 'EventRegisterController@index');
    Route::get('/register/{id}', 'EventRegisterController@getEventRegister');
    Route::put('/register/{id}', 'EventRegisterController@update');
    Route::delete('/register/{id}', 'EventRegisterController@delete');
});

Route::group([
    'prefix' => 'public'
], function ($router) {
    Route::get('/register/{id}', 'EventRegisterController@getByUuidEventRegister');
    Route::get('/person/email/{email}', 'PersonController@getByEmailPerson');
    Route::get('/designers', 'DesignersController@index');
    Route::post('/register/submit/{uuid}', 'EventRegisterAndPersonController@updateStatusAndDesigners');
    Route::post('/register/submit/new/{uuid}', 'EventRegisterAndPersonController@updateStatusAndCreatePerson');
});

Route::get('test/email', function(){
    $send_mail = 'cloudaccer@gmail.com';
    $content = [
        'title' => 'Event HuntStreet Code:[HUNTBAZAAR ]',
        'body' => 'This is for testing email using smtp',
        'link' => 'http://localhost:8000'
    ];
    dispatch(new App\Jobs\SendEmailJob($send_mail, $content));
    dd('send mail successfully !!');
});

