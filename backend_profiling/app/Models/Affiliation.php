<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affiliation extends Model
{
    /** @use HasFactory<\Database\Factories\AffiliationFactory> */
    use HasFactory;

    protected $table = 'affiliations';
    protected $primaryKey = 'Affiliation_ID';
    protected $guarded = [];

    public function student() { return $this->belongsTo(StudentDemographic::class, 'Student_ID', 'Student_ID'); }
}
