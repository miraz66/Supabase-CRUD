import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

export default function Todo({
  newTodo,
  setNewTodo,
  handleAddTodo,
  todoList,
  handleDeleteTodo,
  handleToggleTodo,
  handleEditTodo,
}) {
  const [showMore, setShowMore] = useState(null);
  const [editedTodo, setEditedTodo] = useState(null);

  const toggleShowMore = (id) => {
    setShowMore((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mx-auto mt-16 max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">
          To-Do List
        </h1>
      </div>

      <form className="mx-auto w-full max-w-sm px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="mr-3 w-full appearance-none border-none bg-transparent px-2 py-1 leading-tight text-gray-700 focus:outline-none"
            type="text"
            placeholder="Add a task"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            required
          />
          <button
            className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
            type="button"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
      </form>

      <ul className="divide-y divide-gray-200 px-4">
        {todoList?.map((todo) => {
          const isEditing = editedTodo?.id === todo.id; // Check if in edit mode
          const nameChanged = isEditing && editedTodo.name !== todo.name; // Check if name has changed

          return (
            <li key={todo.id}>
              <div className="flex justify-between py-4">
                {isEditing ? (
                  <div className="flex w-full items-center">
                    <input
                      className="w-full appearance-none rounded border px-2 py-1 text-gray-700 focus:outline-none"
                      type="text"
                      onChange={(e) =>
                        setEditedTodo({ ...editedTodo, name: e.target.value })
                      }
                      value={editedTodo.name}
                      required
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <input
                      onChange={() => handleToggleTodo(todo.id)}
                      checked={!!todo.is_completed}
                      id={`todo-${todo.id}`}
                      name={`todo-${todo.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className="ml-3 block text-gray-900"
                    >
                      <span
                        className={clsx(
                          "text-lg font-medium",
                          todo.is_completed && "line-through",
                        )}
                      >
                        {todo.name}
                      </span>
                      <span className="text-xs font-light text-gray-500">
                        {" "}
                        Due on 4/1/23
                      </span>
                    </label>
                  </div>
                )}

                {!isEditing && (
                  <ChevronDownIcon
                    className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => toggleShowMore(todo.id)}
                    aria-hidden="true"
                  />
                )}
              </div>

              {showMore === todo.id && (
                <div className="flex justify-end gap-2 pb-2">
                  {isEditing ? (
                    <>
                      {nameChanged ? (
                        <button
                          onClick={() => {
                            handleEditTodo(editedTodo.id, editedTodo.name);
                            setEditedTodo(null);
                          }}
                          className="rounded bg-teal-500 px-2.5 py-1 text-sm text-white hover:bg-teal-700"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditedTodo(null)}
                          className="rounded bg-gray-400 px-2.5 py-1 text-sm text-white hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {!todo.is_completed && (
                        <button
                          onClick={() => setEditedTodo({ ...todo })}
                          className="rounded bg-teal-500 px-2.5 py-1 text-sm text-white hover:bg-teal-700"
                        >
                          Edit
                        </button>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="rounded bg-red-500 px-2.5 py-1 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
