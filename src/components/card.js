// функция общая по карточкам
export function addCard(cardData, deleteCard, cardLike, openCardImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const ButtonLike = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

   
    


    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
      });

    ButtonLike.addEventListener('click', cardLike);
      
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


