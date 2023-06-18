import "./HabitTile.css";
import { MdArchive } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useHabits } from "../../context/HabitContext";
import { toast } from "react-hot-toast";

export const HabitTile = ({ habit }) => {
  const { name } = habit;
  const { dispatch, alreadyArchieved, setOpenHabitModal, setEditingHabitId } =
    useHabits();
  return (
    <div className="habit-tile">
      <h1>{name}</h1>
      <div className="action-icons">
        <FaEdit
          onClick={() => {
            setOpenHabitModal((prev) => !prev);
            setEditingHabitId(habit.id);
            dispatch({ type: "EDIT_HABIT_DETAILS", payload: habit });
          }}
        />
        <MdArchive
          className="archieve-icon"
          title="Archieve"
          onClick={() =>
            alreadyArchieved(habit)
              ? toast.error("Habit already in Archieves")
              : dispatch({ type: "MOVE_TO_ARCHIEVE", payload: habit })
          }
        />
        <FaTrashAlt
          className="trash-icon"
          title="Trash"
          onClick={() => dispatch({ type: "MOVE_TO_TRASH", payload: habit })}
        />
      </div>
    </div>
  );
};