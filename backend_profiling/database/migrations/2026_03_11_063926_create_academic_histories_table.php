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
        Schema::create('academic_histories', function (Blueprint $table) {
            $table->id('Record_ID');
            $table->string('Student_ID');
            $table->string('Course_Code');
            $table->decimal('Final_Grade', 5, 2);
            $table->string('Term_Taken');
            $table->timestamps();
            
            $table->foreign('Student_ID')->references('Student_ID')->on('student_demographics')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_histories');
    }
};
