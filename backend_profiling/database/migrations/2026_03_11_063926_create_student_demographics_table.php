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
        Schema::create('student_demographics', function (Blueprint $table) {
            $table->string('Student_ID')->primary();
            $table->string('First_Name');
            $table->string('Last_Name');
            $table->integer('Year_Level');
            $table->string('Degree_Program');
            $table->string('Email_Address');
            $table->boolean('Med_Clearance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_demographics');
    }
};
