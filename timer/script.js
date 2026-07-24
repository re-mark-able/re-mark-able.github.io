var timeSet = false;
var endTime = new Date();

// Change end time when needed (buttons pressed or on keyup)
function setEndTimeValue() {
  endTime.setSeconds(
    endTime.getSeconds() +
      parseInt(document.getElementById("secondsInput").value),
  );
  endTime.setMinutes(
    endTime.getMinutes() +
      parseInt(document.getElementById("minutesInput").value),
  );
  endTime.setHours(
    endTime.getHours() + parseInt(document.getElementById("hoursInput").value),
  );

  // Start hasn't been pressed, update the end
  if (!timeSet) {
    document.getElementById("endTime").innerHTML = endTime.toLocaleTimeString();
  }
}

// + / - button presses
function handleHourClick(add = true) {
  const currentValue = (document.getElementById("hoursInput").value = !add
    ? parseInt(document.getElementById("hoursInput").value) - 1
    : parseInt(document.getElementById("hoursInput").value) + 1);

  setEndTimeValue();
}

function handleMinuteClick(add = true) {
  const currentValue = (document.getElementById("minutesInput").value = !add
    ? parseInt(document.getElementById("minutesInput").value) - 1
    : parseInt(document.getElementById("minutesInput").value) + 1);
  setEndTimeValue();
}

function handleSecondClick(add = true) {
  const currentValue = (document.getElementById("secondsInput").value = !add
    ? parseInt(document.getElementById("secondsInput").value) - 1
    : parseInt(document.getElementById("secondsInput").value) + 1);
  setEndTimeValue();
}

function timeSince() {
  const total = Date.parse(endTime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function setRemainingTime() {
  const now = new Date();

  const diff = endTime.getTime() - now.getTime();

  if (diff < 0) {
    document.getElementById("remainingTime").innerHTML = "Time's up!";
  } else {
    document.getElementById("remainingTime").innerHTML = timeSince(
      endTime,
    ).replaceAll("in ", "");
  }
}

function setCurrentTime() {
  const now = new Date();
  document.getElementById("currentTime").innerHTML = now.toLocaleTimeString();

  setRemainingTime();
}

function startClick() {
  timeSet = true;
  document.getElementById("formSection").classList.add("d-none");
  document.getElementById("startBtn").classList.add("d-none");
}

setInterval(() => {
  setCurrentTime();
}, 1000);

setEndTime();

function changeTheme() {
  
  const currentMode = document.documentElement.getAttribute("data-bs-theme");
  if( currentMode === "dark" ) {
    document.documentElement.setAttribute("data-bs-theme","light");
    document.getElementById("theme").classList.remove("fa-moon").add("fa-sun");
  } else {
    document.documentElement.setAttribute("data-bs-theme","dark");
    document.getElementById("theme").classList.remove("fa-sun").add("fa-moon");
  }
}
