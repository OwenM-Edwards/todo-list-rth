const TodoListItems = ({ activeTodoList, onRemoveItem, onEditItemName, onToggleCompletion }: { 
        activeTodoList: any, 
        onRemoveItem: (id: string) => void, 
        onEditItemName: (id: string, newText: string) => void ,
        onToggleCompletion: (id: string) => void 
    }) => {

    // Handle delete a todo list item
    const handleDeleteTodolistItem = async (id: string) => {
        onRemoveItem(id);
    };

    // Handle change for todo item name
    const handleItemNameChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        onEditItemName(id, newText); 
    };
  
    return (
        activeTodoList?.items?.length ? (
            <ul className="list-none mt-4">
                {activeTodoList.items.map((item: any) => (
                    <li key={item.id} className="flex items-center justify-between bg-blue-100 p-2 rounded-md mb-2">
                        <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleItemNameChange(item.id, e)}
                            className="text-black p-2 w-full bg-transparent border-none"
                        />
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => onToggleCompletion(item.id)}
                            className="mt-1 w-6 h-6 rounded-full border-2 border-gray-400 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition-colors"
                        />

                        <p 
                            className="ml-10 text-black cursor-pointer ml-2"
                            onClick={() => handleDeleteTodolistItem(item.id)}
                        > X
                        </p>
                    </li>
                ))}
            </ul>
        ) : ( <p className="text-black">No todo list items</p> )
    );
};

export default TodoListItems;
