/// <reference types="cypress" />
describe('Приложение TODO', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
    // запускаем игру, не выбрав ни одну из радиокнопок
    // по умолчанию должно запуститься поле размером 4x4
    cy.get('button').click();
  });

  it('В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима', () => {
    // проверяем создание поля (div.playing-field)
    cy.get('.playing-field').should('be.visible');
    // считаем количество карточек на поле (их должно быть 16)
    cy.get('.card').should('have.length', 16);
    // проверяем наличие класса "upside", который переворачивает карточки
    // *upside имеет свойство transform: rotateY(180deg), которое и переворачивает карточку
    cy.get('.img').should('exist');
  });

  it('Нажать на одну произвольную карточку. Убедиться, что она осталась открытой', () => {
    // нажимаем на карточку и проверяем наличие класса "upside"
    cy.get('.card:first-child').click().should('have.class', 'upside');
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой', () => {
    // получаем document страницы
    cy.document().then((doc) => {
      // первая карточка
      const firstCard = doc.querySelector('.card').dataset.value;

      for (let i = 2; i <= 16; ++i) {
        // перебираем остальные карточки
        let anotherCard = doc.querySelector(`.card:nth-child(${i})`).dataset.value;
        // кликаем на первую
        cy.get('.card:first-child').click();
        // кликаем на следующую
        cy.get(`.card:nth-child(${i})`).click();
        // если у карточек совпадает dataset.value, то прерываем цикл
        if (firstCard === anotherCard) {
          // убеждаемся, что карточки с классом "founded" существуют (а значит открыты)
          cy.get('.founded:first-child').should('be.visible');
          cy.get(`.founded:nth-child(${i})`).should('be.visible');
          break;
        }
      }
    });
  });

  it('Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на вторую карточку обе становятся невидимыми', () => {
    cy.document().then((doc) => {
      const firstCard = doc.querySelector('.card').dataset.value;
      for (let i = 2; i <= 16; ++i) {
        // перебираем остальные карточки
        let anotherCard = doc.querySelector(`.card:nth-child(${i})`).dataset.value;
        // кликаем на первую
        cy.get('.card:first-child').click();
        // кликаем на следующую
        cy.get(`.card:nth-child(${i})`).click();
        // если у карточек не совпадает dataset.value, то прерываем цикл
        if (firstCard !== anotherCard) {
          // убеждаемся, не имеет класса "upside"
          cy.get('.card:first-child').should('not.have.class', 'upside');
          cy.get(`.card:nth-child(${i})`).should('not.have.class', 'upside');
          break;
        }
      }
    });
  });
});
