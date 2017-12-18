function leadingZero(unit) {
  return ("0" + unit).slice(-2);
}

export function secondsToMinutes(time) {
  return (
    leadingZero(Math.floor(time / 60)) +
    ":" +
    leadingZero(Math.floor(time % 60))
  );
}

export function minutesToSeconds(time) {
  const parts = time.split(":");
  const minutes = Number(parts[0]);
  const seconds = Number(parts[1]);
  return Number((minutes * 60 + seconds).toFixed(0));
}
