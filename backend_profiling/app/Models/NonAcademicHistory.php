<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NonAcademicHistory extends Model
{
    /** @use HasFactory<\Database\Factories\NonAcademicHistoryFactory> */
    use HasFactory;

    protected $table = 'non_academic_histories';
    protected $primaryKey = 'Activity_ID';
    protected $guarded = [];

    public function student() { return $this->belongsTo(StudentDemographic::class, 'Student_ID', 'Student_ID'); }

    public static function logActivity($studentId, $type, $name, $date, $contribution)
    {
        return self::create([
            'Student_ID' => $studentId,
            'Activity_Type' => $type,
            'Activity_Name' => $name,
            'Date_Logged' => $date,
            'Contribution' => $contribution,
        ]);
    }
}
