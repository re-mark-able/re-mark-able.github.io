function setCurrentTime() {
  const now = new Date();
  document.getElementById("currentTime").innerHTML = now.toLocaleTimeString();
  setRemainingTime();
}

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

function timeSince(targetDate) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // Target minus current time (in seconds)
  const deltaSeconds = Math.floor(
    (targetDate.getTime() - new Date().getTime()) / 1000,
  );

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  // Find the first unit where the difference matches
  for (const unit of units) {
    if (Math.abs(deltaSeconds) >= unit.seconds || unit.name === "second") {
      const value = Math.round(deltaSeconds / unit.seconds);
      return rtf.format(value, unit.name);
    }
  }
}

function setEndTime() {
  const end = getEndTime();
  document.getElementById("endTime").innerHTML = end.toLocaleTimeString();
  setRemainingTime();
}

function setRemainingTime() {
  document.getElementById("remainingTime").innerHTML = timeSince(end);

  /*
  const now = new Date();
  const end = getEndTime();

  const diff = end.getTime() - now.getTime();

  if (diff < 0) {
    document.getElementById("remainingTime").innerHTML = "Time's up!";
  } else {
    document.getElementById("remainingTime").innerHTML =
      diff / 1000 + " seconds";
  }
      */
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

setInterval(() => {
  (setCurrentTime(), 1000);
});
setEndTime();
