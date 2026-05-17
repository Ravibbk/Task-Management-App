import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => { state.tasks = action.payload; },
    addTask: (state, action) => { state.tasks.unshift(action.payload); },
    updateTask: (state, action) => {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setTaskLoading: (state, action) => { state.loading = action.payload; },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, setTaskLoading } = taskSlice.actions;
export default taskSlice.reducer;