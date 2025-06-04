import {useEffect, useState} from "react";
import supabase from "./supabase-clint.js";
import Todo from "./components/Todo.jsx";
import Test from "./components/Test.jsx";

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

  console.log(todoList);
  const handleAddTodo = async () => {
    const newTodoData = {
      name: newTodo,
      is_completed: false
    };

    const { data, error } = await supabase
        .from("TodoList")
        .insert([newTodoData])
        .single();

    if (error) {
      console.log("Error adding todo:", error);
    } else {
      setTodoList((prev)=>[...prev, data]);
      setNewTodo("");
    }
  };


  const handleDeleteTodo = async (id) => {
    const { error } = await supabase
        .from("TodoList")
        .delete()
        .match({ id });
    if (error) {
      console.log("Error deleting todo:", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
      <>
        <Todo setNewTodo={setNewTodo} handleAddTodo={handleAddTodo} todoList={todoList} handleDeleteTodo={handleDeleteTodo}/>
      </>
  );
}

export default App;
