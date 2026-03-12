<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultyRole extends Model
{
    /** @use HasFactory<\Database\Factories\FacultyRoleFactory> */
    use HasFactory;

    protected $table = 'faculty_roles';
    protected $primaryKey = 'Role_ID';
    protected $guarded = [];

    public function faculty() { return $this->belongsTo(FacultyCore::class, 'Faculty_ID', 'Faculty_ID'); }

    public function assignRole($advisoryType, $assignedGroup)
    {
        $this->update([
            'Advisory_Type' => $advisoryType,
            'Assigned_Group' => $assignedGroup,
        ]);
        return $this;
    }
}
