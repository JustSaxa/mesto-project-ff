// функция общая по карточкам
import {deleteCards} from './api.js';


export function addCard(cardData, deleteCard, cardLike, openCardImage, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const LikeButton = cardElement.querySelector('.card__like-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardNumberOfLike = cardElement.querySelector('.number__of-likes');
    
    

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardNumberOfLike.textContent = cardData.likes.length;
    console.log(cardData._id)
    
    if(!(userId===cardData.owner._id)) {
      deleteButton.style.display = 'none';
    }
    
    deleteButton.addEventListener('click', function(){
      deleteCards(cardData._id) // Вызов функции удаления карточки на сервере
      .then(() => {
        // Удаление карточки из DOM только после успешного удаления на сервере
        deleteCard(cardElement);
       
      })
      
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


