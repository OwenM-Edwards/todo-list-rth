import { createTodoList, deleteTodoList } from "../services/todoListService"; 
import { logout } from "../services/authService"; 
import LoadingIndicator from "./LoadingIndicator";
import { useStoreActions } from 'easy-peasy';

const Sidebar = ({
        loading, 
        setLoading,
        todoLists, 
        onRefetchTodoLists,
        onSetActiveTodoList,
        activeTodoListId,
    }: {
        loading:boolean, 
        setLoading: (arg:boolean) => void, 
        todoLists:any[], 
        onRefetchTodoLists: () => void,
        onSetActiveTodoList: (todoList: any) => void,
        activeTodoListId:number,
    }) => {
    const setAuthenticated = useStoreActions((actions) => actions.setAuthenticated);

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
    }

    // Handle creating a new todo list
    const handleCreateTodoList = async () => {
        try {
            setLoading(true)
            // Create the new todo list
            await createTodoList();

            // Refetch the todo lists after creation
            onRefetchTodoLists();
        } catch (error) {
            setLoading(false)
            console.error("Error creating todo list:", error);
        }
    };

    // Handle delete a todo list
    const handleDeleteTodoList = async (id:string) => {
        console.log('heyo')
        try {
            setLoading(true)
            // Create the new todo list
            await deleteTodoList(id);

            // Refetch the todo lists after creation
            onRefetchTodoLists();
        } catch (error) {
            setLoading(false)
            console.error("Error creating todo list:", error);
        }
    };

    // Handle selecting a todo list
    const handleSelectTodoList = (todoList: any) => {
        onSetActiveTodoList(todoList);
    };

    return (
        <div className="min-h-screen bg-grey min-w-1/5 p-2 flex flex-col">
            {loading 
                ? <div className="flex items-center justify-center"><LoadingIndicator/></div>
                : <>
                    <h2 className="text-white text-4xl py-5 pb-7">Todo Lists</h2>

                    {todoLists && todoLists.length > 0 ? (
                    <ul>
                        {todoLists.map((list) => (
                            <span key={list.id} className="items-center flex justify-between bg-white px-5 py-1 mb-1">
                                <li 
                                    className={`min-w-4/5 text-black p-2 cursor-pointer`} 
                                    onClick={() => handleSelectTodoList(list)}
                                >
                                    <p className={`${
                                        list.id === activeTodoListId ? "underline" : ""
                                    }`} >{list.name}</p>
                                </li>

                                <p className="text-black cursor-pointer" onClick={() => handleDeleteTodoList(list.id)}>X</p>
                            </span>
                        ))}
                    </ul>
                    ) : <p>No todo lists available</p>}
        
                    <button
                        onClick={handleCreateTodoList}
                        className="mt-4 text-white px-4 py-2 rounded w-full"
                    >
                        Add new list
                    </button>

                    <button
                        onClick={handleLogout}
                        className="mt-4 text-white px-4 py-2 rounded mt-auto"
                    > 
                        Logout
                    </button>
                </>
            }
        </div>
    );
};

export default Sidebar;
