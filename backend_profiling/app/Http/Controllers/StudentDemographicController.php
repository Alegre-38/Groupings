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
        $studentDemographic->load([
            'academicHistories', 
            'nonAcademicHistories', 
            'disciplinaryRecords', 
            'skillRepositories', 
            'affiliations'
        ]);

        $profileConfig = $studentDemographic->getProfile();
        $gwa = \App\Models\AcademicHistory::calculateGWA($studentDemographic->Student_ID);

        return response()->json(array_merge($profileConfig, [
            'academic_histories' => $studentDemographic->academicHistories,
            'non_academic_histories' => $studentDemographic->nonAcademicHistories,
            'disciplinary_records' => $studentDemographic->disciplinaryRecords,
            'skill_repositories' => $studentDemographic->skillRepositories,
            'affiliations' => $studentDemographic->affiliations,
            'calculated_gwa' => $gwa,
        ]));
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

    public function updateClearance(Request $request, $id)
    {
        $request->validate(['Med_Clearance' => 'required|boolean']);
        $student = StudentDemographic::findOrFail($id);
        $student->updateClearance($request->input('Med_Clearance'));
        return response()->json(['message' => 'Medical clearance updated securely.', 'student' => $student]);
    }
}
