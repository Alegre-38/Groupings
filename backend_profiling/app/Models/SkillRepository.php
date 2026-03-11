<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillRepository extends Model
{
    /** @use HasFactory<\Database\Factories\SkillRepositoryFactory> */
    use HasFactory;

    protected $table = 'skill_repositories';
    protected $primaryKey = 'Skill_ID';
    protected $guarded = [];

    public function student() { return $this->belongsTo(StudentDemographic::class, 'Student_ID', 'Student_ID'); }
}
