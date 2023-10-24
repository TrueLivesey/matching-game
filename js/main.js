import Card from './card.js';

//создаём массив
function createArray(value) {
  const size = value * value;
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.trunc(i / 2) + 1);
  }

  //перемешиваем массив, исользуя Тасование Фишера—Йетса
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

//  создаём начальное меню
function createApp() {
  //  форма
  const form = document.createElement('form');
  form.classList.add('form');

  const playingField = document.createElement('div');

  const title = document.createElement('h2');
  title.classList.add('form__mb', 'form__title');
  const btn = document.createElement('button');
  btn.classList.add('form__mb', 'btn', 'form__btn');

  title.textContent = 'Выберите размер поля';
  btn.textContent = 'Новая игра';

  form.append(title);

  let formList = document.createElement('div');
  formList.classList.add('form__list');

  let formRadioCount = 1;
  let formInputID = 1;

  //  радиокнопки
  for (let i = 0; i < 4; ++i) {
    let formItem = document.createElement('div');
    formItem.classList.add('form__item');

    let formInput = document.createElement('input');
    let formLabel = document.createElement('label');

    formInput.classList.add('form__check');
    formLabel.classList.add('form__label');

    formLabel.textContent = `${formRadioCount * 2}х${formRadioCount * 2}`;

    formInput.setAttribute('type', 'radio');
    formInput.setAttribute('name', 'radio');

    formInput.setAttribute('id', `check-${formInputID}`);
    formInput.setAttribute('value', `check-${formInputID}`);
    formLabel.setAttribute('for', `check-${formInputID}`);

    formItem.append(formInput);
    formItem.append(formLabel);
    formList.append(formItem);
    formInputID++;
    formRadioCount++;
  }

  form.append(formList);
  form.append(btn);

  const container = document.getElementById('container');
  container.append(form);

  const formLabelList = document.querySelectorAll('input[type="radio"]');
  let input = null;

  formLabelList.forEach((formLabel) => {
    formLabel.addEventListener('click', () => {
      input = parseInt(document.querySelector('input[type="radio"]:checked + label').textContent.slice(0, 1));
      if (input !== 1) {
        return;
      } else {
        input = parseInt(document.querySelector('input[type="radio"]:checked + label').textContent.slice(0, 2));
      }
    });
  });
  let interval;

  //  при клике на кнопку "начать игру" создаётся игровое поле (playingField)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.querySelector('.playing-field')) {
      document.querySelector('.timer').remove();
      document.querySelector('.main__list').remove();

      if (document.querySelector('.game-result')) {
        document.querySelector('.game-result').remove();
      }

      if (document.querySelector('.game-result__victory')) {
        document.querySelector('.game-result__victory').remove();
      }
    }
    let value = input;
    if (!value) {
      value = 4;
    }

    const array = createArray(value);
    let count = 0;
    let timerValue = 60;

    //  создаём разметку
    let mainList = null;
    mainList = document.createElement('div');
    mainList.classList.add('main__list');

    //  размеры поля
    if (parseInt(value) === 10) {
      mainList.style.width = value * 120 + 'px';
    } else if (parseInt(value) === 8) {
      mainList.style.width = value * 150 + 'px';
    } else {
      mainList.style.width = value * 190 + 'px';
    }
    mainList.style.margin = 'auto';

    //  разметка
    const lose = document.createElement('div');

    lose.classList.add('game-result');

    const loseInscription = document.createElement('h2');
    loseInscription.classList.add('game-result__lose');

    let timer = document.createElement('div');
    timer.classList.add('timer');

    loseInscription.textContent = 'Поражение!';

    lose.append(loseInscription);

    playingField.classList.add('playing-field');
    playingField.append(timer);
    playingField.append(mainList);

    container.append(playingField);

    //  таймер
    timer.textContent = `Оставшееся время: ${timerValue}`;
    clearInterval(interval);
    interval = setInterval(setTime, '1000');

    function setTime() {
      timerValue--;
      if (timerValue === -1) {
        timerValue = 0;
        let arrayCards = document.querySelectorAll('.card');

        for (let arrayCard of arrayCards) {
          arrayCard.classList.add('card__stop');
          arrayCard.style.transform = 'rotate(0deg)';
        }

        clearInterval(interval);
        mainList.style.pointerEvents = 'none';
        mainList.append(lose);
      }
      timer.textContent = `Оставшееся время: ${timerValue}`;
    }

    //добавляем карточки
    for (const arrayElem of array) {
      let card = new Card(arrayElem, mainList, interval).createElement(value, count);
    }
  });
}

window.createApp = createApp;

document.addEventListener('DOMContentLoaded', () => {
  createApp();
});
