<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentDemographicController;
use App\Http\Controllers\FacultyCoreController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/students', [StudentDemographicController::class, 'index']);
Route::get('/students/{id}', [StudentDemographicController::class, 'show']);

Route::get('/faculties', [FacultyCoreController::class, 'index']);
Route::get('/faculties/{id}', [FacultyCoreController::class, 'show']);
