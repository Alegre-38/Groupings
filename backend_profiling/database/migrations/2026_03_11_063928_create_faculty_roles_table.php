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
        Schema::create('faculty_roles', function (Blueprint $table) {
            $table->id('Role_ID');
            $table->string('Faculty_ID');
            $table->string('Advisory_Type');
            $table->string('Assigned_Group');
            $table->timestamps();
            
            $table->foreign('Faculty_ID')->references('Faculty_ID')->on('faculty_cores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculty_roles');
    }
};
