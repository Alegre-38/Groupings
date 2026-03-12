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

    public static function addSkill($studentId, $category, $skill, $proficiency)
    {
        return self::create([
            'Student_ID' => $studentId,
            'Skill_Category' => $category,
            'Specific_Skill' => $skill,
            'Proficiency' => $proficiency,
        ]);
    }

    public function updateProficiency($newProficiency)
    {
        $this->update(['Proficiency' => $newProficiency]);
        return $this;
    }
}
