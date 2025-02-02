<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoListController;

Route::get('/healthcheck', function () {
    return response()->json(['message' => 'API is working!']);
});

// Auth
Route::prefix('auth')->group(function () {
    // Registration Route
    Route::post('/register', [AuthController::class, 'register']);

    // Login Route
    Route::post('/login', [AuthController::class, 'login']);

    // Logout Route
    Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    });
});

// Users
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

// Todo Lists
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/todo-lists', [TodoListController::class, 'index']);
    Route::post('/todo-lists', [TodoListController::class, 'store']);
    Route::delete('/todo-lists/{id}', [TodoListController::class, 'destroy']);
    Route::put('/todo-lists/{id}', [TodoListController::class, 'update']);
});