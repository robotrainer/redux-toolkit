import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { todosSelector } from "../../store/slices/todosSlice";
import { addTodo, removeTodo } from "../../store/slices/todosSlice";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { todos } = useSelector(todosSelector);
  const dispatch = useDispatch();

  const getNewTask = (data) => {
    console.log(data);

    dispatch(addTodo({ task: data.newTask }));

    reset();
  };

  return (
    <div className="app">
      <header>
        <h1>TODO list with RTK</h1>
      </header>

      <main>
        <form className="new-task-form" onSubmit={handleSubmit(getNewTask)}>
          <label className="new-task-input">
            <span>Новое дело</span>
            <input
              type="text"
              placeholder="Введите дело.."
              {...register("newTask", {
                required: "Поле не должно быть пустым",
              })}
            />
            {errors.newTask && <span>{errors.newTask.message}</span>}
          </label>
          <input type="submit" value="Создать" />
        </form>

        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <span>{todo.task}</span>
                <button
                  onClick={() => {
                    dispatch(removeTodo({ id: todo.id }));
                  }}
                >
                  Удалить
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default App;
