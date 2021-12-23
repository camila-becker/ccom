function addDaysToDate(days) {
  const newDate = new Date();
  let datePlusDays = new Date(newDate.getTime() + days * 24 * 60 * 60 * 1000);
  return (
    datePlusDays.getDate() +
    "/" +
    (datePlusDays.getMonth() + 1) +
    "/" +
    datePlusDays.getFullYear()
  );
}

function date() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours() - 3;
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  let hourF = hour < 10 ? `0${hour}` : hour;
  let minutesF = minutes < 10 ? `0${minutes}` : minutes;
  let secondsF = seconds < 10 ? `0${seconds}` : seconds;

  return (currentDate = `${day}/${month}/${year} - ${hourF}:${minutesF}:${secondsF}`);
}

module.exports = { addDaysToDate, date };
