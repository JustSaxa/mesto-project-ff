// функция общая по карточкам
import {deleteCards, putLike, deleteLike} from './api.js';

export function cardLike(evt, cardId, userId) {
  const likeButton = evt.target;
  const cardElement = likeButton.closest('.card');
  const likesCountElement = cardElement.querySelector('.number__of-likes');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    // Удаление лайка
    deleteLike(cardId)
      .then((result) => {
        likeButton.classList.remove('card__like-button_is-active');
        likesCountElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    // Добавление лайка
    putLike(cardId)
      .then((result) => {
        likeButton.classList.add('card__like-button_is-active');
        likesCountElement.textContent = result.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export function addCard(cardData, deleteCard, cardLike, openCardImage, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
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

    if (cardData.likes.some(like => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    }

    deleteButton.addEventListener('click', function(){
      deleteCards(cardData._id) // Вызов функции удаления карточки на сервере
      .then(() => {
        // Удаление карточки из DOM только после успешного удаления на сервере
        deleteCard(cardElement);
       
      })
      
      });

      
      likeButton.addEventListener('click', function(evt) {
        cardLike(evt, cardData._id, userId);
      });
  
      
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


