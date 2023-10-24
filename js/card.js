// класс карточки
export default class Card {
  _array = [];

  constructor(arrayElem, container, interval) {
    this.arrayElem = arrayElem;
    this.container = container;
    this.interval = interval;
  }

  createElement(value, count) {
    this.mainList = document.querySelector('.main__list');
    this.playingField = document.querySelector('.playing-field');
    let upside = document.getElementsByClassName('upside');
    this.count = count;
    this.card = document.createElement('div');
    this.card.dataset.value = this.arrayElem;
    if (parseInt(value) === 10) {
      this.card.style.width = 100 + 'px';
      this.card.style.height = 100 + 'px';
    } else if (parseInt(value) === 8) {
      this.card.style.width = 120 + 'px';
      this.card.style.height = 120 + 'px';
    }
    this.front = document.createElement('div');
    const back = document.createElement('div');

    this.front.classList.add('card__face', 'card__front');
    back.classList.add('card__face', 'card__back');

    this.getNumber = this.arrayElem;
    this.card.append(this.front);
    this.card.append(back);

    this.card.classList.add('card');
    this.card.classList.add('card-id');

    // переворачиваем карточки
    let timeoutIDFlip;
    let timeoutIDPointer;

    function flipDelay() {
      upside[1].classList.remove('upside');
      upside[0].classList.remove('upside');
    }

    function flipBack() {
      clearTimeout(timeoutIDFlip);
      clearTimeout(timeoutIDPointer);
      timeoutIDFlip = setTimeout(flipDelay, 800);
      timeoutIDPointer = setTimeout(pointerDelay, 820);
    }

    function pointerDelay() {
      const cards = document.getElementsByClassName('card-id');
      for (const card of cards) {
        if (!card.classList.contains('founded')) {
          card.style.pointerEvents = 'auto';
        }
      }
    }

    function finishVictory(container, interval) {
      const victoryWrapper = document.createElement('div');
      victoryWrapper.classList.add('game-result');

      const victory = document.createElement('h2');
      victory.classList.add('game-result__victory');
      victory.textContent = 'Победа!';

      victoryWrapper.append(victory);
      container.append(victoryWrapper);

      clearInterval(interval);
    }

    this.card.addEventListener('click', () => {
      if (this.mainList.style.pointerEvents) {
        return;
      }
      this.card.classList.add('upside');
      this.card.style.pointerEvents = 'none';

      const upsideArray = document.querySelectorAll('.upside');
      let timeout;

      if (upsideArray.length > 1) {
        const notUpside = document.querySelectorAll('.card:not(.upside)');

        for (let notUpsideElem of notUpside) {
          notUpsideElem.style.pointerEvents = 'none';
        }
        if (upside[0].dataset.value === upside[1].dataset.value) {
          for (let i = 0; i < 2; ++i) {
            upside[i].classList.add('founded');
            upside[i].style.pointerEvents = 'none';
          }
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            notUpside.forEach((notUpsideElem) => {
              if (!notUpsideElem.classList.contains('founded')) {
                notUpsideElem.style.pointerEvents = 'auto';
              }
            });
          }, 820);
        }

        flipBack();

        const founded = document.querySelectorAll('.founded');
        founded.forEach((foundedElem) => {
          foundedElem.style.pointerEvents = 'none';
        });
        let timeoutIDFinish;

        if (founded.length === value * value) {
          clearTimeout(timeoutIDFinish);
          timeoutIDFinish = setTimeout(() => {
            finishDelay(this.mainList, this.interval);
          }, 800);
        }

        function finishDelay(mainList, interval) {
          let arrayCards = document.querySelectorAll('.card');

          for (let arrayCard of arrayCards) {
            arrayCard.classList.add('card__stop');
          }

          mainList.style.pointerEvents = 'none';
          finishVictory(mainList, interval);
        }
      }
    });

    this.container.append(this.card);
  }

  set getNumber(value) {
    this._cardNumber = value;
    const cardImgArr = [
      '../images/1.png',
      '../images/2.png',
      '../images/3.png',
      '../images/4.png',
      '../images/5.png',
      '../images/6.png',
      '../images/7.png',
      '../images/8.png',
      '../images/9.png',
      '../images/10.png',
      '../images/11.png',
      '../images/12.png',
      '../images/13.png',
      '../images/14.png',
      '../images/15.png',
      '../images/16.png',
      '../images/17.png',
      '../images/18.png',
      '../images/19.png',
      '../images/20.png',
      '../images/21.png',
      '../images/22.png',
      '../images/23.png',
      '../images/24.png',
      '../images/25.png',
      '../images/26.png',
      '../images/27.png',
      '../images/28.png',
      '../images/29.png',
      '../images/30.png',
      '../images/31.png',
      '../images/32.png',
    ];
    const img = document.createElement('img');
    img.classList.add('img');
    img.dataset.value = this._cardNumber;
    img.src = cardImgArr[value - 1];
    if (value >= 0) {
      this.front.append(img);
    } else {
      return;
    }
  }
  get getNumber() {
    return this._cardNumber;
  }
}
