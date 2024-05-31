// функция общая по карточкам
export function addCard(cardData, deleteCard, cardLike, openCardImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const LikeButton = cardElement.querySelector('.card__like-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', function(){
        deleteCard(cardElement);
      });

    LikeButton.addEventListener('click', cardLike);
      
    cardImage.addEventListener('click', function(){
        openCardImage(cardImage);
      });

      return cardElement;
  };

// функция удаления карточки
  export function deleteCard(card) {
    card.remove();
  }

// функция лайка карточки
  export function cardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  }


