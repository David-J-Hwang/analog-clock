// Get references to DOM elements
const body = document.querySelector("body"),
  // 시침, 분침, 초침
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  // 다크모드 - 라이트모드 스위치
  modeSwitch = document.querySelector(".mode-switch");

// 시침, 분침, 초침 회전각
const hourDeg = document.querySelector(".hour-deg"),
  minuteDeg = document.querySelector(".minute-deg"),
  secondDeg = document.querySelector(".second-deg");

// 현재시각 문자열
const fullTime = document.querySelector(".full-time");

// add a click event listener to modeSwitch
modeSwitch.addEventListener("click", () => {
  // toggle the "dark" class on the body element
  body.classList.toggle("dark");
  // check if the "dark" class is currently present on the body element
  const isDarkMode = body.classList.contains("dark");
  modeSwitch.textContent = isDarkMode
    ? "Turn to Light Mode"
    : "Turn to Dark Mode";
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

const updateTime = () => {
  // Get current time and calculate degrees for clock hands
  let date = new Date(),
    // secToDeg = ((second + (millisecond / 1000)) / 60 ) * 360;
    secToDeg = (date.getSeconds() / 60) * 360,
    minToDeg = (date.getMinutes() / 60) * 360,
    hrToDeg = (date.getHours() / 12) * 360;

  // Smooth Rotate Version
  let hour = date.getHours(); // ex. 13
  let minute = date.getMinutes(); // ex. 45
  let second = date.getSeconds(); // ex. 33
  let millisecond = date.getMilliseconds(); // ex. 123
  let smoothSecond = second + millisecond / 1000; // 33.123
  let smoothMinute = minute + smoothSecond / 60;
  let smoothHour = hour + smoothMinute / 60;

  let smoothSecToDeg = (smoothSecond / 60) * 360;
  let smoothMinToDeg = (smoothMinute / 60) * 360;
  let smoothHrToDeg = (smoothHour / 12) * 360;

  // Rotate the clock hands to the appropriate degree based on the current time
  // secondHand.style.transform = `rotate(${secToDeg}deg)`
  // minuteHand.style.transform = `rotate(${minToDeg}deg)`
  // hourHand.style.transform = `rotate(${hrToDeg}deg)`
  secondHand.style.transform = `rotate(${smoothSecToDeg}deg)`;
  minuteHand.style.transform = `rotate(${smoothMinToDeg}deg)`;
  hourHand.style.transform = `rotate(${smoothHrToDeg}deg)`;

  hourDeg.textContent = `시침 회전각: ${Math.floor(smoothHrToDeg * 100) / 100}`;
  minuteDeg.textContent = `분침 회전각: ${
    Math.floor(smoothMinToDeg * 10) / 10
  }`;
  secondDeg.textContent = `초침 회전각: ${Math.floor(smoothSecToDeg)}`;
  fullTime.textContent = `현재시각: ${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

// call updateTime to set clock hands every second
// update time per 10ms
setInterval(updateTime, 10);

// call updateTime function on page load
updateTime();
