import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopups, closePopupOnOverlay, closePopupOnButton} from './components/modal.js';
import {addCard, deleteCard, cardLike } from './components/card.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

const ProfileEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
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
const ImageLink = formElementAddCard.elements.link; // ссылка на картинку

const popupViewImage = document.querySelector('.popup_type_image'); // модальное окно с избображением
const ElementViewImage = popupViewImage.querySelector('.popup__image'); // изображение в модальном окне
const popupImageTitle = popupViewImage.querySelector('.popup__caption'); 

// @todo: Вывести карточки на страницу
initialCards.forEach((function (element) {
    cardList.append(addCard(element, deleteCard, cardLike, openCardImage));
  }))

 // закрытие попапов  
popups.forEach(function(popup) {
  popup.addEventListener('mousedown', closePopupOnOverlay, closePopupOnButton);
});

// открытие попапа редиктирования профиля
ProfileEdit.addEventListener('click', function(){
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditForm);
});

// функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent =  nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopups(popupEditForm);
  }

// обработки кнопки сохранить в редактировании профиля
formElementProfile.addEventListener('submit', handleFormSubmit); 

//функция открытия изображение карточки
function openCardImage(cardView){
  ElementViewImage.src = cardView.src;
  ElementViewImage.alt = cardView.alt;

  popupImageTitle.textContent = cardView.alt;

  openPopup(popupViewImage);
}

// открытие попапа добавление карточки
cardAdd.addEventListener('click', function(){
  openPopup(popupAddCard);
});

// функция добавление карточки
function createCard(evt) {
  evt.preventDefault();

  const cardData = {
      name: placeName.value,
      link: ImageLink.value
  };

  const newCard = addCard(cardData, deleteCard, cardLike, openCardImage);
  cardList.prepend(newCard);
  
  closePopups(popupAddCard);

  formElementAddCard.reset();
}

// обработки кнопки сохранить в добавлении карточки
formElementAddCard.addEventListener('submit', createCard); 