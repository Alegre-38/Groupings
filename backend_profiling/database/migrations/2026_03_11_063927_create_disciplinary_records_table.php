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
        Schema::create('disciplinary_records', function (Blueprint $table) {
            $table->id('Violation_ID');
            $table->string('Student_ID');
            $table->string('Offense_Level');
            $table->string('Status');
            $table->date('Date_Logged');
            $table->timestamps();
            
            $table->foreign('Student_ID')->references('Student_ID')->on('student_demographics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disciplinary_records');
    }
};
