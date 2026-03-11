<?php

namespace App\Http\Controllers;

use App\Models\FacultyCore;
use Illuminate\Http\Request;

class FacultyCoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            \App\Models\FacultyCore::with(['roles'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $faculty = \App\Models\FacultyCore::with(['roles'])->find($id);

        if (!$faculty) {
            return response()->json(['message' => 'Faculty not found'], 404);
        }

        return response()->json($faculty);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FacultyCore $facultyCore)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FacultyCore $facultyCore)
    {
        //
    }
}
