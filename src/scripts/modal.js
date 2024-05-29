//Открытие попапа
export function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupsEsc);
  }

//закрытие попапа по клику
export function closePopups(popup) {
    popup.classList.remove('popup_is-opened');
}

// Закрытие попапа по ESC
export function closePopupsEsc(evt){
    if(evt.key === 'Escape') {
      const opPopup = document.querySelector('.popup_is-opened');
     closePopups(opPopup);
    }
   
  }