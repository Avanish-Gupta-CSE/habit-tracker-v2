import { createContext, useContext, useReducer, useState } from "react";
import { habits } from "../data/data";

export const HabitContext = createContext();

const initialState = {
  habits: habits,
  habitDetails: {
    id: "",
    name: "",
    repeat: "",
    goal: "",
    timeOfDay: "",
    startDate: "",
  },
};

const reducerFunc = (state, { type, payload }) => {
  switch (type) {
    case "MOVE_TO_ARCHIEVE":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === payload.id
            ? { ...habit, archieved: !habit.archieved }
            : habit
        ),
      };
    case "MOVE_TO_TRASH":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== payload.id),
      };
    case "ADD_HABIT_DETAILS":
      return {
        ...state,
        habitDetails: { ...state.habitDetails, [payload.name]: payload.value },
      };
    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, payload],
      };
    case "EDIT_HABIT_DETAILS":
      return { ...state, habitDetails: payload };
    case "EDIT_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === payload.id ? { ...payload } : habit
        ),
      };
    default:
      return state;
  }
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const [openHabitModal, setOpenHabitModal] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState(null);

  const alreadyArchieved = (habit) => habit.archieved;
  return (
    <HabitContext.Provider
      value={{
        state,
        dispatch,
        alreadyArchieved,
        openHabitModal,
        setOpenHabitModal,
        editingHabitId,
        setEditingHabitId,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);