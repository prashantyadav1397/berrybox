import axios from "axios";

const API_URL = "http://localhost:3000";

export const getAllTodos = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/todos`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (todoItem) => {
  try {
    const { data } = await axios.post(`${API_URL}/todos`, { todoItem });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (id, todoItem) => {
  try {
    const { data } = await axios.put(`${API_URL}/todos/items/${id}`, { todoItem });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteTodo = async (id) => {
  try {
    return await axios.delete(`${API_URL}/todos/items/${id}`);
  } catch (error) {
    console.error(error);
  }
}