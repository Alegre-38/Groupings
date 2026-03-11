<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affiliations', function (Blueprint $table) {
            $table->id('Affiliation_ID');
            $table->string('Student_ID');
            $table->string('Org_Name');
            $table->string('Role');
            $table->timestamps();
            
            $table->foreign('Student_ID')->references('Student_ID')->on('student_demographics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliations');
    }
};
