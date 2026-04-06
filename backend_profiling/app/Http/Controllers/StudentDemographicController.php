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
        return response()->json(StudentDemographic::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Student_ID'     => 'required|string|max:20|unique:students,Student_ID',
            'First_Name'     => 'required|string|max:50',
            'Last_Name'      => 'required|string|max:50',
            'Email'          => 'required|email|unique:students,Email',
            'Degree_Program' => 'required|string|max:100',
            'Year_Level'     => 'required|integer|min:1|max:5',
        ]);

        // Auto-create a user account for the student
        $user = \App\Models\User::create([
            'User_ID'        => $request->Student_ID,
            'Username'       => strtolower(str_replace(' ', '.', $request->First_Name)) . '.' . strtolower(str_replace(' ', '.', $request->Last_Name)),
            'Password'       => bcrypt('Student@123'),
            'Role'           => 'Student',
            'Account_Status' => 'Active',
        ]);

        $student = StudentDemographic::create([
            'Student_ID'       => $request->Student_ID,
            'User_ID'          => $user->User_ID,
            'First_Name'       => $request->First_Name,
            'Last_Name'        => $request->Last_Name,
            'Email'            => $request->Email,
            'Degree_Program'   => $request->Degree_Program,
            'Year_Level'       => $request->Year_Level,
            'Medical_Clearance'=> false,
            'Enrollment_Status'=> 'Active',
        ]);

        return response()->json(['message' => 'Student registered successfully.', 'student' => $student], 201);
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
