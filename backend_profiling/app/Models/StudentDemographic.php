<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDemographic extends Model
{
    /** @use HasFactory<\Database\Factories\StudentDemographicFactory> */
    use HasFactory;

    protected $table = 'student_demographics';
    protected $primaryKey = 'Student_ID';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function academicHistories() { return $this->hasMany(AcademicHistory::class, 'Student_ID', 'Student_ID'); }
    public function nonAcademicHistories() { return $this->hasMany(NonAcademicHistory::class, 'Student_ID', 'Student_ID'); }
    public function disciplinaryRecords() { return $this->hasMany(DisciplinaryRecord::class, 'Student_ID', 'Student_ID'); }
    public function skillRepositories() { return $this->hasMany(SkillRepository::class, 'Student_ID', 'Student_ID'); }
    public function affiliations() { return $this->hasMany(Affiliation::class, 'Student_ID', 'Student_ID'); }
}
