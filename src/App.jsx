import { useEffect, useState } from "react";
import supabase from "./supabase-clint.js";
import Todo from "./components/Todo.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");
    if (error) {
      console.error(error);
    } else {
      setTodoList(data);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    const newTodoData = {
      name: newTodo,
      is_completed: false,
    };

    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo:", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = async (id) => {
    const current = todoList.find((todo) => todo.id === id);
    if (!current) return;

    const { error } = await supabase
      .from("TodoList")
      .update({ is_completed: !current.is_completed })
      .eq("id", id);

    if (!error) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo,
        ),
      );
    }
  };

  const handleDeleteTodo = async (id) => {
    const { error } = await supabase.from("TodoList").delete().eq("id", id);
    if (!error) {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleEditTodo = async (id, name) => {
    const { error } = await supabase
      .from("TodoList")
      .update({ name })
      .eq("id", id);

    if (!error) {
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, name } : todo)),
      );
    }
  };

  return (
    <Todo
      newTodo={newTodo}
      setNewTodo={setNewTodo}
      handleAddTodo={handleAddTodo}
      todoList={todoList}
      handleDeleteTodo={handleDeleteTodo}
      handleToggleTodo={handleToggleTodo}
      handleEditTodo={handleEditTodo}
    />
  );
}

export default App;
