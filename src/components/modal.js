//Открытие попапа
export function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupsEsc);
  }

//закрытие попапа
export function closePopups(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupsEsc);
}

//закрытие попапа по крестику
export function closePopupOnButton(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopups(evt.target.closest('.popup'));
  }
}


// Закрытие попапа по ESC
export function closePopupsEsc(evt){
    if(evt.key === 'Escape') {
      const opPopup = document.querySelector('.popup_is-opened');
      if(opPopup){
        closePopups(opPopup);
      }
    }
  }

//закрытие функции по оверлею
export function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopups(evt.target.closest('.popup'));
  }
}