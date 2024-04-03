import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector(`.form`);
const delayEl = document.querySelector(`.delay`);
const fulfilledEl = document.querySelector(`.fulfilled`);
const rejectedEl = document.querySelector(`.rejected`);
console.dir(fulfilledEl);

formEl.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = delayEl.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fulfilledEl.checked) {
         resolve(delay);
      } else {
        return reject(delay);
      }
    }, delay);
  });

  promise
  .then(delay => {
    iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
          })
  })
  .catch(delay => {
    iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
          })
  });
}

           