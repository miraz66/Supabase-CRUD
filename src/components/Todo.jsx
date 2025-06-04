import clsx from "clsx";

export default function Todo({ setNewTodo, handleAddTodo, todoList, handleDeleteTodo}) {

  return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div className="px-4 py-2">
          <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
        </div>
        <form className="w-full max-w-sm mx-auto px-4 py-2">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Add a task"
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </form>

        <ul className="divide-y divide-gray-200 px-4">
          {todoList?.map((todo) => (
              <li key={todo.id} className="py-4 flex justify-between">
                <div className="flex items-center">
                  <input checked={todo.is_completed} id="todo1" name="todo1" type="checkbox"
                         className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded" readOnly/>
                  <label htmlFor="todo1" className="ml-3 block text-gray-900">
                    <span className={clsx("text-lg font-medium", todo.is_completed && "line-through")}>{todo.name}</span>
                    <span className="text-xs font-light text-gray-500"> Due on 4/1/23</span>
                  </label>
                </div>

                <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 text-sm cursor-pointer hover:bg-red-700 text-white font-medium py-1 px-2.5 rounded">Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
};
