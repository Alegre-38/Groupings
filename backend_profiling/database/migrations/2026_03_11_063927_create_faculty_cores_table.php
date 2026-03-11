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
        Schema::create('faculty_cores', function (Blueprint $table) {
            $table->string('Faculty_ID')->primary();
            $table->string('First_Name');
            $table->string('Last_Name');
            $table->string('Department');
            $table->string('Employment_Type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculty_cores');
    }
};
