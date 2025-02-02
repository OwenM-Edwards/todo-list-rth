import Sidebar from "../components/Sidebar";
import TodoListDisplay from "../components/TodoListDisplay";
import { getTodoLists } from "../services/todoListService";
import {useState, useEffect} from "react";

const TodoPage = () => {
    const [todoLists, setTodoLists] = useState<any[]>([]);
    const [fetch, setFetch] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTodoList, setActiveTodoList] = useState<any | null>(null);

    // Fetch all current todo lists, save to state
    useEffect(() => {
        if(fetch) {
            setFetch(false)
            setActiveTodoList(null)
            const fetchTodoLists = async () => {
                try {
                    const lists = await getTodoLists();
                    console.log('here pls', lists)
                    setTodoLists(lists);
                } catch (error) {
                    console.error("Error fetching todo lists:", error);
                }
                setLoading(false)
            };
        
            fetchTodoLists();
        }
    }, [fetch]);

    useEffect(() => {
        if(todoLists.length){
            setActiveTodoList(todoLists[0])
        }
    }, [todoLists])

    // Handle setting the active todo list
    const handleSetActiveTodoList = (todoList: any) => {
        setActiveTodoList(todoList);
    };

    return (
      <div className="min-h-screen min-w-screen w-full flex">
        <Sidebar 
            setLoading={setLoading} 
            loading={loading} 
            todoLists={todoLists} 
            onRefetchTodoLists={() => setFetch(true)}
            onSetActiveTodoList={handleSetActiveTodoList}
            activeTodoListId={activeTodoList?.id}
        />
        
        <TodoListDisplay 
            activeTodoList={activeTodoList} 
            setLoading={setLoading} 
            loading={loading}
            onRefetchTodoLists={() => setFetch(true)}
        />
      </div>
    );
};
  
export default TodoPage;
  