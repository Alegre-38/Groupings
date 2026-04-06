<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentDemographicController;
use App\Http\Controllers\FacultyCoreController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/students', [StudentDemographicController::class, 'index']);
Route::post('/students', [StudentDemographicController::class, 'store']);
Route::get('/students/{id}', [StudentDemographicController::class, 'show']);

Route::get('/faculties', [FacultyCoreController::class, 'index']);
Route::get('/faculties/{id}', [FacultyCoreController::class, 'show']);

Route::put('/students/{id}/clearance', [StudentDemographicController::class, 'updateClearance']);
Route::post('/faculties/{id}/roles', [\App\Http\Controllers\FacultyRoleController::class, 'assignRole']);
Route::post('/students/{id}/non-academic', [\App\Http\Controllers\NonAcademicHistoryController::class, 'logActivity']);
Route::put('/disciplinary/{id}/status', [\App\Http\Controllers\DisciplinaryRecordController::class, 'updateStatus']);
Route::post('/students/{id}/skills', [\App\Http\Controllers\SkillRepositoryController::class, 'storeSkill']);
Route::put('/skills/{id}/proficiency', [\App\Http\Controllers\SkillRepositoryController::class, 'updateProficiency']);
Route::put('/affiliations/{id}/promote', [\App\Http\Controllers\AffiliationController::class, 'promoteRole']);
