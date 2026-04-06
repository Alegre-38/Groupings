<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDemographic extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'Student_ID';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'Student_ID',
        'User_ID',
        'First_Name',
        'Last_Name',
        'Year_Level',
        'Degree_Program',
        'Email',
        'Medical_Clearance',
        'Enrollment_Status',
    ];

    // Map frontend-facing keys to actual DB columns
    protected $appends = ['Email_Address', 'Med_Clearance'];

    public function getEmailAddressAttribute()
    {
        return $this->Email;
    }

    public function getMedClearanceAttribute()
    {
        return $this->Medical_Clearance;
    }

    public function academicHistories()
    {
        return $this->hasMany(AcademicHistory::class, 'Student_ID', 'Student_ID');
    }

    public function nonAcademicHistories()
    {
        return $this->hasMany(NonAcademicHistory::class, 'Student_ID', 'Student_ID');
    }

    public function disciplinaryRecords()
    {
        return $this->hasMany(DisciplinaryRecord::class, 'Student_ID', 'Student_ID');
    }

    public function skillRepositories()
    {
        return $this->hasMany(SkillRepository::class, 'Student_ID', 'Student_ID');
    }

    public function affiliations()
    {
        return $this->hasMany(Affiliation::class, 'Student_ID', 'Student_ID');
    }

    public function getProfile()
    {
        return [
            'Student_ID'     => $this->Student_ID,
            'First_Name'     => $this->First_Name,
            'Last_Name'      => $this->Last_Name,
            'Year_Level'     => $this->Year_Level,
            'Degree_Program' => $this->Degree_Program,
            'Email_Address'  => $this->Email,
            'Med_Clearance'  => $this->Medical_Clearance,
        ];
    }

    public function updateClearance($status)
    {
        $this->Medical_Clearance = $status;
        $this->save();
    }
}
