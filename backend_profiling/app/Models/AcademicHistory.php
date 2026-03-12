<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicHistory extends Model
{
    /** @use HasFactory<\Database\Factories\AcademicHistoryFactory> */
    use HasFactory;

    protected $table = 'academic_histories';
    protected $primaryKey = 'Record_ID';
    protected $guarded = [];

    public function student() { return $this->belongsTo(StudentDemographic::class, 'Student_ID', 'Student_ID'); }

    public static function calculateGWA($studentId)
    {
        $records = self::where('Student_ID', $studentId)->get();
        if ($records->isEmpty()) {
            return 0;
        }
        return $records->avg('Final_Grade');
    }
}
