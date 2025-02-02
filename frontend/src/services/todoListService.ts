import axiosInstance from "./axiosConfig"; 

// Update entire Todo List (name & items)
export const updateTodoList = async (listId: string, name: string, items: any[]) => {
  const response = await axiosInstance.put(`/todo-lists/${listId}`, {name, items});
  return response.data;
};

// Get all Todo Lists
export const getTodoLists = async () => {
  const response = await axiosInstance.get("/todo-lists");
  return response.data;
};

// Create a new Todo List
export const createTodoList = async () => {
  const response = await axiosInstance.post("/todo-lists");
  return response.data;
};

// Delete a Todo List
export const deleteTodoList = async (id: string) => {
  const response = await axiosInstance.delete(`/todo-lists/${id}`);
  return response.data;
};