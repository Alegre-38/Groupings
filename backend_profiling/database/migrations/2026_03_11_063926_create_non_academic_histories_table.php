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
        Schema::create('non_academic_histories', function (Blueprint $table) {
            $table->id('Activity_ID');
            $table->string('Student_ID');
            $table->string('Activity_Type');
            $table->string('Activity_Name');
            $table->date('Date_Logged');
            $table->string('Contribution');
            $table->timestamps();
            
            $table->foreign('Student_ID')->references('Student_ID')->on('student_demographics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('non_academic_histories');
    }
};
