import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

import { useAddTodoMutation, useGetTodosQuery, useDeleteTodoMutation} from "../../store/api/services/todosApi";
import {useDispatch} from "react-redux";
import {logIn} from "../../store/slices/authSlice";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  const [addTodo, { isLoading: isAddTodoLoading }] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useDispatch();

  const getNewTask = async (data) => {
    console.log(data);

    try {
      await addTodo({
        userId: 1,
        id: Date.now(),
        title: data.newTask,
        completed: false,
      }).unwrap();
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  useEffect(() => {
    dispatch(logIn({id: 1, auth: true}));
  }, []);

  if (isError) return <div>{JSON.stringify(error)}</div>;

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

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <span>{todo.title}</span>
                  <button
                    onClick={async () => {
                      try {
                        await deleteTodo(todo.id).unwrap();
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Удалить
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
};

export default App;
