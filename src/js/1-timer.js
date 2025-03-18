const head = document.querySelector("head");
const monseratFontLinks = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>;`
head.insertAdjacentHTML("beforeEnd", monseratFontLinks);

import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = null;
const dateInput = document.querySelector("#datetime-picker");
dateInput.classList.add("timer-input")
const buttonStart = document.querySelector("button");
buttonStart.classList.add("button-start");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");
buttonStart.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   locale: {
    firstDayOfWeek: 1,
weekdays: {
    shorthand: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  }
  },
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      return userSelectedDate = selectedDates[0].getTime();
    }
    return
  },
};

dateInput.addEventListener("input", () => {
  if (getDate.selectedDates[0] < Date.now()) {
    buttonStart.disabled = true;
        iziToast.error({
  message: "Please choose a date in the future",
  position: "topCenter",
  backgroundColor: "#ef4040",
  titleColor: "white",
  messageColor: "white",
  iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/delete-sign.png",
  progressBarColor: "#a94442",
  timeout: 10000,
  close: true,
  closeOnClick: true,
  transitionIn: "fadeIn",
  transitionOut: "fadeOut"
});;
    return
  }
  else {
    buttonStart.disabled = false;
    iziToast.destroy();
  }
})

buttonStart.addEventListener("click", startTimer);


function startTimer() {
  const timerInt = setInterval(() => {
  if (userSelectedDate > Date.now()) {
    buttonStart.disabled = true;
    dateInput.disabled = true;
    const timeRemainingUnix = userSelectedDate - Date.now();
    const timeRemaining = convertMs(timeRemainingUnix);
    days.textContent = timeRemaining.days;
    hours.textContent = timeRemaining.hours;
    minutes.textContent = timeRemaining.minutes;
    seconds.textContent = timeRemaining.seconds;
  }
  else {
    clearInterval(timerInt);
    dateInput.disabled = false;
  }
  }, 1000)
};

const getDate = new flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days: String(days).padStart(2, "0"), hours: String(hours).padStart(2, "0"), minutes: String(minutes).padStart(2, "0"), seconds: String(seconds).padStart(2, "0") };
}

