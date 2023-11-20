//знаходимо елементи на сторінці
const refs = {
    btnStartEl: document.querySelector('button[data-start]'),
    btnStopEl: document.querySelector('button[data-stop]'),
}
let timerId = null;
// console.dir(refs.btnStartEl);
// console.dir(refs.btnStopEl);
// console.log(document.body);

// вішаємо слухачі на обидві кнопки по кліку (на кнопку Start з таймаутом)
refs.btnStartEl.addEventListener('click', onStartClick);
refs.btnStopEl.addEventListener('click', onStopClick)

function onStartClick(event) {  
    //змінюємо колір відразу при натисканні
    document.body.style.backgroundColor = getRandomHexColor();
    //робимо кнопку неактивною
    event.target.disabled = true;
    //вмикаємо зміну кольору з інтервалом в 1 сек
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);      
  
}
function onStopClick() {
    // вимикаємо таймер зміни кольору
    clearInterval(timerId);
    //робимо активною кнопку старт
    refs.btnStartEl.disabled = false;   
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
