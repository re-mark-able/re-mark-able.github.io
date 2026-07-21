var timeSet = false;

function getEndTime() {
  const end = new Date();
  end.setSeconds(
    end.getSeconds() + parseInt(document.getElementById("secondsInput").value),
  );
  end.setMinutes(
    end.getMinutes() + parseInt(document.getElementById("minutesInput").value),
  );
  end.setHours(
    end.getHours() + parseInt(document.getElementById("hoursInput").value),
  );

  return end;
}

function timeSince() {
  const end = getEndTime();
  const total = Date.parse(end) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function setEndTime() {
  const end = getEndTime();
  document.getElementById("endTime").innerHTML = end.toLocaleTimeString();
  setRemainingTime();
}

function setRemainingTime() {
  const now = new Date();
  const end = getEndTime();

  const diff = end.getTime() - now.getTime();

  if (diff < 0) {
    document.getElementById("remainingTime").innerHTML = "Time's up!";
  } else {
    document.getElementById("remainingTime").innerHTML = timeSince(
      end,
    ).replaceAll("in ", "");
  }
}

function handleHourClick(add = true) {
  const currentValue = (document.getElementById("hoursInput").value = !add
    ? parseInt(document.getElementById("hoursInput").value) - 1
    : parseInt(document.getElementById("hoursInput").value) + 1);

  setEndTime();
}

function handleMinuteClick(add = true) {
  const currentValue = (document.getElementById("minutesInput").value = !add
    ? parseInt(document.getElementById("minutesInput").value) - 1
    : parseInt(document.getElementById("minutesInput").value) + 1);
  setEndTime();
}

function handleSecondClick(add = true) {
  const currentValue = (document.getElementById("secondsInput").value = !add
    ? parseInt(document.getElementById("secondsInput").value) - 1
    : parseInt(document.getElementById("secondsInput").value) + 1);
  setEndTime();
}

function setCurrentTime() {
  const now = new Date();
  document.getElementById("currentTime").innerHTML = now.toLocaleTimeString();
  if (!timeSet) {
    setEndTime();
  } else {
    setRemainingTime();
  }
}

function startClick() {
  timeSet = true;
  document.getElementById("formSection").classList.add("d-none");
  document.getElementById("startBtn").classList.add("d-none");
}

setInterval(() => {
  setCurrentTime();
}, 1000);
