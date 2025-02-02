<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('todo_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('todo_list_id');
            $table->text('text');
            $table->boolean('completed')->default(false);
            $table->timestamps();

            $table->foreign('todo_list_id')->references('id')->on('todo_lists')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('todo_items');
    }
};
