<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisciplinaryRecord extends Model
{
    /** @use HasFactory<\Database\Factories\DisciplinaryRecordFactory> */
    use HasFactory;

    protected $table = 'disciplinary_records';
    protected $primaryKey = 'Violation_ID';
    protected $guarded = [];

    public function student() { return $this->belongsTo(StudentDemographic::class, 'Student_ID', 'Student_ID'); }
}
