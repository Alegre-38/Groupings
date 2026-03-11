<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultyCore extends Model
{
    /** @use HasFactory<\Database\Factories\FacultyCoreFactory> */
    use HasFactory;

    protected $table = 'faculty_cores';
    protected $primaryKey = 'Faculty_ID';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $guarded = [];

    public function roles() { return $this->hasMany(FacultyRole::class, 'Faculty_ID', 'Faculty_ID'); }
}
