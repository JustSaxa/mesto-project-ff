import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopups, closePopupEsc} from './scripts/modal.js';



// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');


const profileTitle = document.querySelector('.profile__title'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // описание профиля

const formElementProfile = document.forms['edit-profile']; // форма профиля
const nameInput = formElementProfile.elements.name; // форма профиля ИМЯ
const jobInput = formElementProfile.elements.description; // форма профиля ОПИСАНИЕ



const ProfileEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const cardAdd = document.querySelector('.profile__add-button'); // кнопка добавление карточки
const card = cardTemplate.querySelector('.places__item'); //  карточка
const cardView = card.querySelector('.card__image');
const ButtonLike = cardTemplate.querySelector('.card__like-button');


const popupEditForm = document.querySelector('.popup_type_edit'); // редактирование профиля модальное окно
const popupAddCard = document.querySelector('.popup_type_new-card'); // добавление карточки модальное окно
const popupViewImage = document.querySelector('.popup_type_image'); // модальное окно с избображение
const closePopup = document.querySelector('.popup__close'); // кнопка закрытия

const popups = document.querySelectorAll('.popup'); // все попапы

// @todo: Функция создания карточки


function addCard(cardCreate, deleteCard, cardLike) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const ButtonLike = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = cardCreate.name;
    cardElement.querySelector('.card__image').src = cardCreate.link;
    cardElement.querySelector('.card__image').alt = cardCreate.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
      });

      ButtonLike.addEventListener('click', cardLike);
      

     

      return cardElement;
  };
// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
  }
// @todo: Вывести карточки на страницу
initialCards.forEach((function (element) {
    cardList.append(addCard(element, deleteCard, cardLike));
  }))

// открытие попапа редиктирования профиля
ProfileEdit.addEventListener('click', function(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditForm);
});
// открытие попапа добавление карточки
cardAdd.addEventListener('click', function(){
  openPopup(popupAddCard);
});

// открытие попапа


 // закрытие попапов  
  popups.forEach(element => {
    element.addEventListener('click', function(evt){
      if (evt.target.classList.contains('popup__close') || evt.target === element) {
        closePopups(element)
      }
    })

      
  });
 

 
// функция редактирования профиля
  function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent =  nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopups(popupEditForm);
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmit); 
function clickImage(){
  cardView.addEventListener('click', function(popup){
    popup.classList.add('popup_is-opened');
  })
}

// функция лайка карточки
function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}


console.log(ButtonLike)