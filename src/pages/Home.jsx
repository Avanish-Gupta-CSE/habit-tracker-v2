import { useNavigate } from "react-router-dom";
import { HabitTile } from "../components/HabitTile/HabitTile";
import { useHabits } from "../context/HabitContext";
import { IoMdAddCircle } from "react-icons/io";
import { HabitModal } from "../components/HabitModal/HabitModal";

export const Home = () => {
  const navigate = useNavigate();
  const { state, openHabitModal, setOpenHabitModal } = useHabits();
  return (
    <div className="home">
      <h1 className="title">Home</h1>
      <hr />
      <div className="habit-tiles">
        <div className="habit-tile">
          <div className="action-icons add">
            <IoMdAddCircle
              title="Create Habit"
              onClick={() => setOpenHabitModal((prev) => !prev)}
            />
          </div>
        </div>
        {state.habits?.map((habit) => (
          <HabitTile key={habit.id} habit={habit} />
        ))}
      </div>
      <div>
        <button
          className="archieve-page-btn"
          onClick={() => navigate("/archieves")}
        >
          Go to Archieves
        </button>
      </div>
      {openHabitModal && (
        <div className="modal-container">
          <HabitModal />
        </div>
      )}
    </div>
  );
};
