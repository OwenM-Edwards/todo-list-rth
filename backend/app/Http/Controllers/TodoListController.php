<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use App\Models\TodoItem;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function update(Request $request, $id)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'items' => 'array',
            'items.*.id' => 'nullable|integer|exists:todo_items,id', 
            'items.*.text' => 'required|string|max:255',
            'items.*.completed' => 'required|boolean' // Validate the 'completed' field
        ]);

        // Find the todo list
        $todoList = TodoList::findOrFail($id);
        $todoList->name = $validated['name'];  // Update the name
        $todoList->save();

        // Separate existing and new items
        // Filter out new items (those without an ID)
        $existingItems = collect($todoList->items->keyBy('id')); 
        $updatedItems = collect($validated['items'])
            ->filter(fn($item) => isset($item['id']))
            ->keyBy('id'); 

        // Remove deleted items (existing items not in the request)
        $existingItems->diffKeys($updatedItems)->each->delete();

        // Add or update items
        foreach ($updatedItems as $itemId => $itemData) {
            // Update existing item
            TodoItem::where('id', $itemId)->update(['text' => $itemData['text'], 'completed' => $itemData['completed']]);
        }

        // Handle new items (those without an ID)
        $newItems = collect($validated['items'])->filter(fn($item) => !isset($item['id'])); 
        foreach ($newItems as $itemData) {
            // Create new item associated with the todo list
            $todoList->items()->create([
                'text' => $itemData['text'],
                'completed' => $itemData['completed'],
            ]);
        }

        // Return the updated todo list with items
        return response()->json($todoList->load('items'));
    }

    // Create a new todo list
    public function store(Request $request)
    {
        $list = TodoList::create(['name' => "New List"]);

        return response()->json($list, 201);
    }

    // Get all todo lists
    public function index()
    {
        return response()->json(TodoList::with('items')->orderBy('created_at', 'desc')->get());
    }

    // Delete a todo list
    public function destroy($id)
    {
        $list = TodoList::findOrFail($id);
        $list->delete();

        return response()->json(['message' => 'Todo list deleted']);
    }
}
