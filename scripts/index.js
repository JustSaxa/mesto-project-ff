// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(cardCreate, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = cardCreate.name;
    cardElement.querySelector('.card__image').src = cardCreate.link;
    cardElement.querySelector('.card__image').alt = cardCreate.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
      });

      return cardElement;
  };
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
  }
// @todo: Вывести карточки на страницу

initialCards.forEach((function (element) {
    cardList.append(addCard(element, deleteCard));
  }))


  

  