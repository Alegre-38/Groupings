<?php

namespace App\Http\Controllers;

use App\Models\StudentDemographic;
use Illuminate\Http\Request;

class StudentDemographicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            StudentDemographic::with([
                'academicHistories', 
                'nonAcademicHistories', 
                'disciplinaryRecords', 
                'skillRepositories', 
                'affiliations'
            ])->get()
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
    public function show(StudentDemographic $studentDemographic)
    {
        return response()->json(
            $studentDemographic->load([
                'academicHistories', 
                'nonAcademicHistories', 
                'disciplinaryRecords', 
                'skillRepositories', 
                'affiliations'
            ])
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentDemographic $studentDemographic)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentDemographic $studentDemographic)
    {
        //
    }
}
