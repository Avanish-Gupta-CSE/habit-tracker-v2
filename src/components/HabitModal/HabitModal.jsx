import { useHabits } from "../../context/HabitContext";
import "./HabitModal.css";
import { v4 as uuid } from "uuid";

export const HabitModal = () => {
  const {
    setOpenHabitModal,
    state: { habits, habitDetails },
    dispatch,
    editingHabitId,
    setEditingHabitId,
  } = useHabits();

  const habitFormInputHandler = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "ADD_HABIT_DETAILS", payload: { name, value } });
  };

  const addHabitHandler = (event) => {
    event.preventDefault();
    if (editingHabitId) {
      dispatch({
        type: "EDIT_HABIT",
        payload: { ...habitDetails, id: editingHabitId },
      });
    } else {
      dispatch({ type: "ADD_HABIT", payload: { ...habitDetails, id: uuid() } });
    }
    setEditingHabitId(null);
    setOpenHabitModal((prev) => !prev);

    const habitTiles = document.querySelectorAll('.habit-tile');

habitTiles.forEach((tile) => {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  tile.style.backgroundColor = randomColor;
});
  };

  return (
    <div className="habit-form">
      <div className="form-header">
        <h2>New Habit</h2>
        <hr />
      </div>
      <form onSubmit={addHabitHandler}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={habitDetails.name}
            onChange={habitFormInputHandler}
            required
          />
        </div>
        <div className="adjacent-field">
          <div>
            <label htmlFor="repeat">Repeat: </label>
            <select
              id="repeat"
              name="repeat"
              value={habitDetails.repeat}
              onChange={habitFormInputHandler}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label htmlFor="goal">Goal: </label>
            <select
              id="goal"
              name="goal"
              value={habitDetails.goal}
              onChange={habitFormInputHandler}
            >
              <option value="1 time Daily">1 time Daily</option>
              <option value="2 times Daily">2 times Daily</option>
              <option value="1 time Weekly">1 time Weekly</option>
              <option value="2 times Weekly">2 times Weekly</option>
            </select>
          </div>
        </div>
        <div className="adjacent-field">
          <div>
            <label htmlFor="timeOfDay">Time of Day: </label>
            <select
              id="timeOfDay"
              name="timeOfDay"
              value={habitDetails.timeOfDay}
              onChange={habitFormInputHandler}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
          <div>
            <label htmlFor="startDate">Start Date: </label>
            <select
              id="startDate"
              name="startDate"
              value={habitDetails.startDate}
              onChange={habitFormInputHandler}
            >
              <option value="yesterday">Yesterday</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
          </div>
        </div>
        <div className="action-btns">
          <div className="adjacent-field">
            <button type="submit">Add</button>
            <button
              type="button"
              onClick={() => setOpenHabitModal((prev) => !prev)}
            >
              Discard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};