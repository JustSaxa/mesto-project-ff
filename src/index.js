import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopups, closePopupOnOverlay, closePopupOnButton} from './components/modal.js';
import {addCard, deleteCard, cardLike } from './components/card.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getProfile, patchProfile, getCards, postCard, patchImageProfile} from './components/api.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

const profileEdit = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const cardAdd = document.querySelector('.profile__add-button'); // кнопка добавление карточки

const profileTitle = document.querySelector('.profile__title'); // имя профиля
const profileDescription = document.querySelector('.profile__description'); // описание профиля
const profileImage = document.querySelector('.profile__image');// картинка профиля
const popupProfileImage = document.querySelector('.popup_type_new-avatar');

const popups = document.querySelectorAll('.popup'); // все попапы

const popupEditForm = document.querySelector('.popup_type_edit'); // редактирование профиля модальное окно
const formElementProfile = document.forms['edit-profile']; // форма профиля
const nameInput = formElementProfile.elements.name; // форма профиля ИМЯ
const jobInput = formElementProfile.elements.description; // форма профиля ОПИСАНИЕ

const formElementImageProfile = document.forms['avatar-profile'];
const imageProfileInput = formElementImageProfile.elements['edit-avatar'];



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




// patch обновление профиля


//get запрос на получение карточек



// @todo: Вывести карточки на страницу

 // закрытие попапов  
popups.forEach(function(popup) {
  popup.addEventListener('mousedown', closePopupOnOverlay);
});

// открытие попапа редиктирования профиля
profileEdit.addEventListener('click', function(){
  
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
  clearValidation(popupEditForm, allDataForm);
  openPopup(popupEditForm); 
    
 
  
 

});



// функция редактирования профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 
    evt.submitter.textContent = 'Сохранение...';
    
   
  const profileName = nameInput.value;
  const Description = jobInput.value;

  // Отправка данных на сервер
  patchProfile(profileName, Description)
    .then(response => {
      if (response.ok) {
        return response.json();
   
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
     

      // Закрытие попапа после успешного обновления данных
      closePopups(popupEditForm);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
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
  clearValidation(popupAddCard, allDataForm);
});

// функция добавление карточки

function createCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  const cardData = {
    name: placeName.value,
    link: imageLink.value
  };

  // Отправка данных на сервер
  postCard(cardData.name, cardData.link)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Данные успешно добавлены на сервер, теперь можно добавить карточку в DOM
      const newCard = addCard(data, deleteCard, cardLike, openCardImage);
      cardList.prepend(newCard);

      // Закрытие попапа и сброс формы
      closePopups(popupAddCard);
      formElementAddCard.reset();
    })
    .catch(err => {
      console.error(err); // Обработка ошибки
      // Здесь можно добавить код для показа сообщения об ошибке пользователю
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
  
}
// обработки кнопки сохранить в добавлении карточки
formElementAddCard.addEventListener('submit', createCard); 



enableValidation(allDataForm);





// открытие попапа аватара
profileImage.addEventListener('click', function(){
  
  openPopup(popupProfileImage);
  clearValidation(popupProfileImage, allDataForm);

});


function handleProfileImageSubmit(evt) {
  evt.preventDefault(); 
  evt.submitter.textContent = 'Сохранение...';

  
 
const profileImages = imageProfileInput.value;


// Отправка данных на сервер
patchImageProfile(profileImages)
  .then(response => {
    if (response.ok) {
      return response.json();
 
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then((result) => {
    profileImage.style.backgroundImage = `url(${result.avatar})`;
   
   
   

    // Закрытие попапа после успешного обновления данных
    closePopups(popupProfileImage);
  })
  .catch((err) => {
    console.error(err);
  })

  .finally(() => {
    evt.submitter.textContent = 'Сохранить';
  })

  



}


formElementImageProfile.addEventListener('submit', handleProfileImageSubmit);



Promise.all([getProfile(), getCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;

    cards.forEach((card) => {
      cardList.append(addCard(card, deleteCard, cardLike, openCardImage, profile._id));
    });
  })
  .catch((err) => {
    console.log(err); // Обработка ошибок
  });

function get(){ return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards ', {
  headers: {
    authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); }
 

get();