export const persist = store => next => action => {
  if (action.type === "UPDATE_WORKOUT") {
    const result = next(action);
    const items = store.getState().items;
    // console.log("SAVE - ", items);
    localStorage.setItem("workouts", JSON.stringify(items));

    return result;
  }

  return next(action);
};
