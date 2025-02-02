import { useState, useEffect } from "react";
import { updateTodoList } from "../services/todoListService"; 
import LoadingIndicator from "./LoadingIndicator";
import TodoListItems from "./TodoListItems";

const TodoListDisplay = ({ 
        activeTodoList,
        loading, 
        setLoading,
        onRefetchTodoLists,
    }: { 
        activeTodoList: any,
        loading: boolean, 
        setLoading: (arg: boolean) => void, 
        onRefetchTodoLists: () => void,
    }) => {
    const [editedTodoList, setEditedTodoList] = useState(activeTodoList); // Local state for edits
    const [newItemName, setNewItemName] = useState(""); // State for new todo item
    const [hasChanges, setHasChanges] = useState(false); // Track if there are changes

    // Sync local state when activeTodoList changes
    useEffect(() => {
        setEditedTodoList(activeTodoList);
        setHasChanges(false);
    }, [activeTodoList]);

    // Handle input change for the list name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTodoList({ ...editedTodoList, name: e.target.value });
        setHasChanges(true);
    };

    // Handle adding a new item
    const handleAddTodoItem = async () => {
        if (!newItemName.trim()) return;

        // Prepare new item without an ID, so it can be treated as new by the backend
        const newItem = {
            text: newItemName, 
            completed: false, 
        };

        // Update local state
        setEditedTodoList(prevList => {
            const updatedItems = prevList.items ? [...prevList.items, newItem] : [newItem];
            return { ...prevList, items: updatedItems };
        });

        setNewItemName("");
        setHasChanges(true);
    };

    // Handle removing a todo item
    const handleRemoveTodoItem = (itemId: string) => {
        setEditedTodoList({
            ...editedTodoList,
            items: editedTodoList.items.filter((item: any) => item.id !== itemId)
        });
        setHasChanges(true);
    };

    // Handle editing the text of a todo item
    const handleItemNameChange = (itemId: string, newText: string) => {
        const updatedItems = editedTodoList.items.map((item: any) => 
            item.id === itemId ? { ...item, text: newText } : item
        );
        setEditedTodoList({ ...editedTodoList, items: updatedItems });
        setHasChanges(true);
    };

    // Handle toggling the completion status of a todo item
    const handleToggleCompletion = (itemId: string) => {
        const updatedItems = editedTodoList.items.map((item: any) => 
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        setEditedTodoList({ ...editedTodoList, items: updatedItems });
        setHasChanges(true);
    };

    // Handle updating the todo list
    const handleUpdateTodoList = async () => {
        setLoading(true);

        // Remove 'id' from new items, so backend knows it's new
        const itemsToUpdate = editedTodoList.items.map(item => {
            const { id, ...itemData } = item; // Destructure to remove 'id' from new items
            return itemData;
        });

        try {
            await updateTodoList(editedTodoList.id, editedTodoList.name, itemsToUpdate);
            setHasChanges(false);
            onRefetchTodoLists(); 
        } catch (error) {
            console.error("Error updating todo list:", error);
        }
    };

    // Handle discarding changes (reset to original state)
    const handleDiscardChanges = () => {
        setEditedTodoList(activeTodoList);
        setHasChanges(false);
    };

    return (
        <div className="bg-white min-h-screen min-w-4/5 p-4">
            {loading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <LoadingIndicator />
                </div>
            ) : (
                <div className="max-w-200">
                    <input
                        type="text"
                        value={editedTodoList?.name || ""}
                        onChange={handleNameChange}
                        placeholder="List Name"
                        className="mt-2 text-black text-4xl font-bold w-full p-2"
                    />

                    {!!editedTodoList && (
                        <>
                            <TodoListItems 
                                activeTodoList={editedTodoList}
                                onRemoveItem={handleRemoveTodoItem}
                                onEditItemName={handleItemNameChange} 
                                onToggleCompletion={handleToggleCompletion}
                            />

                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    placeholder="Enter new todo item"
                                    className="px-4 py-2 border border-gray-300 rounded-md w-full text-black"
                                />
                                <button
                                    onClick={handleAddTodoItem}
                                    hidden={!newItemName}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                                >
                                    Add Todo Item
                                </button>
                            </div>
                        </>
                    )}

                    {hasChanges && (
                        <div className="mt-4 space-y-2">
                            <button
                                onClick={handleUpdateTodoList}
                                className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
                            >
                                Save Changes
                            </button>

                            <button
                                onClick={handleDiscardChanges}
                                className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                            >
                                Discard Changes
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoListDisplay;
