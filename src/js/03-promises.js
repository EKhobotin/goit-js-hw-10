import Notiflix from 'notiflix';
//шукаємо змінні
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  }
  //навішуємо слухача
  refs.formEl.addEventListener ('submit', onFormSubmit) 

//функція створення промісу
  function createPromise(position, delay) {
    return new Promise((res, rej)=>{
      const shouldResolve = Math.random() > 0.3; //false або true
      setTimeout(() => {
        const objPromis = { position: position, delay: delay };
        if (shouldResolve) {
          res(objPromis)
        } else {
          rej(objPromis)
        }
      }, delay)
    })
  }


function onFormSubmit(event) {
  event.preventDefault();
  //отримуємо значення з форми
const delay = Number(refs.delayEl.value);
const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);  
  //запускаємо цикл для створення промісів і їх обробки
  for (let i = 0; i < amount; i++) {
    createPromise(i+1, delay+i*step).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}