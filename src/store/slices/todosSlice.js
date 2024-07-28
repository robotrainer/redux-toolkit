import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeStatus(state, action) {},
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        task: action.payload.task,
        completed: false,
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const todosSelector = (state) => state.todos;

export const { addTodo, removeTodo } = slice.actions;

export default slice.reducer;
