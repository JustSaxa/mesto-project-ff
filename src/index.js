import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopups, closePopupOnOverlay, closePopupOnButton} from './components/modal.js';
import {addCard, deleteCard, cardLike } from './components/card.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

const profileEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const cardAdd = document.querySelector('.profile__add-button'); // кнопка добавление карточки

const profileTitle = document.querySelector('.profile__title'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // описание профиля

const popups = document.querySelectorAll('.popup'); // все попапы

const popupEditForm = document.querySelector('.popup_type_edit'); // редактирование профиля модальное окно
const formElementProfile = document.forms['edit-profile']; // форма профиля
const nameInput = formElementProfile.elements.name; // форма профиля ИМЯ
const jobInput = formElementProfile.elements.description; // форма профиля ОПИСАНИЕ

const popupAddCard = document.querySelector('.popup_type_new-card'); // добавление карточки модальное окно
const formElementAddCard = document.forms['new-place']; // форма добавление карточки
const placeName = formElementAddCard.elements['place-name']; // поле наименования местности
const imageLink = formElementAddCard.elements.link; // ссылка на картинку

const popupViewImage = document.querySelector('.popup_type_image'); // модальное окно с избображением
const elementViewImage = popupViewImage.querySelector('.popup__image'); // изображение в модальном окне
const popupImageTitle = popupViewImage.querySelector('.popup__caption'); 

const allDataForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// @todo: Вывести карточки на страницу
initialCards.forEach((function (element) {
    cardList.append(addCard(element, deleteCard, cardLike, openCardImage));
  }))

 // закрытие попапов  
popups.forEach(function(popup) {
  popup.addEventListener('mousedown', closePopupOnOverlay);
});

// открытие попапа редиктирования профиля
profileEdit.addEventListener('click', function(){
  
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openPopup(popupEditForm);
  clearValidation(popupEditForm);
});

// функция редактирования профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent =  nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopups(popupEditForm);
  }

// обработки кнопки сохранить в редактировании профиля
formElementProfile.addEventListener('submit', handleFormProfileSubmit); 

//функция открытия изображение карточки
function openCardImage(cardView){
  elementViewImage.src = cardView.src;
  elementViewImage.alt = cardView.alt;

  popupImageTitle.textContent = cardView.alt;

  openPopup(popupViewImage);
}

// открытие попапа добавление карточки
cardAdd.addEventListener('click', function(){
  
  openPopup(popupAddCard);
  clearValidation(popupAddCard);
});

// функция добавление карточки
function createCard(evt) {
  evt.preventDefault();

  const cardData = {
      name: placeName.value,
      link: imageLink.value
  };

  const newCard = addCard(cardData, deleteCard, cardLike, openCardImage);
  cardList.prepend(newCard);
  
  closePopups(popupAddCard);

  formElementAddCard.reset();
}

// обработки кнопки сохранить в добавлении карточки
formElementAddCard.addEventListener('submit', createCard); 








//валидация
// Вынесем все необходимые элементы формы в константы




enableValidation();