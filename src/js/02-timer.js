import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnStartEl: document.querySelector('.button-start'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let timerId = null;
let timeStop = null;
// робимо кнопку старт неактивною до вибору дати
refs.btnStartEl.disabled = true;
//набір опцій для флетпікра
const options = {
enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {          
        console.log(selectedDates[0]);
        //перевіряємо чи коректна дата, якщо некоректна виводимо аларм, якщо коректна робимо кнопку старт активною
        if (selectedDates[0] < new Date) {
            Notiflix.Notify.warning('Please choose a date in the future');           
        } else {
            refs.btnStartEl.disabled = false;
            timeStop = selectedDates[0].getTime();            
        }
  },
};
//ініціалізуємо об'єкт
flatpickr("#datetime-picker", options);
// додаємо слухача на кнопку старт
refs.btnStartEl.addEventListener('click', onStartTimerClick)
//функція слухача
function onStartTimerClick() {
    timerId = setInterval(() => {        
        const diffTime = timeStop - Date.now();
        if (diffTime < 0) {
            clearInterval(timerId);
            return;
        }
        const objTime = convertMs(diffTime);
        insertTime(objTime);  
    },1000)
}
// додавання 0 до значення
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// вставка часу в розмітку
function insertTime(obj) {
    const keys = Object.keys(obj)
    for (const key of keys) {
    refs[key].textContent = addLeadingZero(obj[key])    
    }
}
// function insertTime(obj) {
//     refs.valueDays.textContent = addLeadingZero(obj.days)
//     refs.valueHours.textContent = addLeadingZero(obj.hours)
//     refs.valueMinutes.textContent = addLeadingZero(obj.minutes)
//     refs.valueSeconds.textContent = addLeadingZero(obj.seconds)    
// }

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

  return { days, hours, minutes, seconds };
}