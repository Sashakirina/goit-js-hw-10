import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('.field [data-days]');
const hoursEl = document.querySelector('.field [data-hours]');
const minutesEl = document.querySelector('.field [data-minutes]');
const secondsEl = document.querySelector('.field [data-seconds]');

let userSelectedDate;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date(Date.now());
    if (selectedDates[0] >= currentTime) {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0];
      return;
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: `topRight`,
        color: `#EF4040`,
        messageColor: '#FAFAFB',
      });
      startBtn.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener(`click`, startTimer);
let intervalId = null;

function startTimer(event) {
  intervalId = setInterval(() => {
    const currentTime = new Date(Date.now());
    const deltaTime = userSelectedDate - currentTime;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      return;
    }
    const deltaTimeConverted = convertMs(deltaTime);
    startBtn.disabled = true;
    input.disabled = true;
    updateTimer(deltaTimeConverted);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}

function updateTimer(time) {
  const { days, hours, minutes, seconds } = time;
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}
