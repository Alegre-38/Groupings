<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $students = \App\Models\StudentDemographic::factory(15)->create();
        
        foreach ($students as $student) {
            \App\Models\AcademicHistory::factory(5)->create(['Student_ID' => $student->Student_ID]);
            \App\Models\NonAcademicHistory::factory(3)->create(['Student_ID' => $student->Student_ID]);
            // Not every student has disciplinary records, only 30% chance
            if (rand(1, 100) <= 30) {
                \App\Models\DisciplinaryRecord::factory(1)->create(['Student_ID' => $student->Student_ID]);
            }
            \App\Models\SkillRepository::factory(4)->create(['Student_ID' => $student->Student_ID]);
            \App\Models\Affiliation::factory(2)->create(['Student_ID' => $student->Student_ID]);
        }

        $faculties = \App\Models\FacultyCore::factory(8)->create();

        foreach ($faculties as $faculty) {
            \App\Models\FacultyRole::factory(rand(1,3))->create(['Faculty_ID' => $faculty->Faculty_ID]);
        }
    }
}
