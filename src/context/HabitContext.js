import { createContext, useContext, useReducer } from "react";
import { habits } from "../data/data";

export const HabitContext = createContext();

const initialState = {
  habits: habits,
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
    default:
      return state;
  }
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const alreadyArchieved = (habit) => habit.archieved;
  return (
    <HabitContext.Provider value={{ state, dispatch, alreadyArchieved }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
