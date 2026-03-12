<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $table = 'certificates';
    protected $primaryKey = 'Certificate_ID';
    public $timestamps = false;

    protected $fillable = [
        'Student_ID',
        'Certificate_Name',
        'Issuing_Organization',
        'Date_Issued',
        'Category',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class, 'Student_ID', 'Student_ID');
    }
}
