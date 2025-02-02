<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class TodoList extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['name'];

    public function items(): HasMany
    {
        return $this->hasMany(TodoItem::class);
    }

    public function todoList()
    {
        return $this->belongsTo(TodoList::class);
    }
}