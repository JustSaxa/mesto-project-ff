import {checkResponse} from '../utils/response.js';



const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
    'Content-Type': 'application/json'
  }
}


//get запрос на получение информации о профиле
export function getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(checkResponse)
  }
// path запрос на обновление профиля
export function patchProfile(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(checkResponse)
  }

  //get запрос на получение информации о карточка
  export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(checkResponse)
  }
  
// post запрос на добавление карточки
  export function postCard(name, url) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: url
      })
    })
    .then(checkResponse)
  }

  //delete запрос на удаление карточки
export  function deleteCards(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
  }

// put запрос на поставку лайка
  export  function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(checkResponse)
  }

// delete запрос на удаления лайка
  export  function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(checkResponse)
  }

  //path запрос изменение картинки профиля
  export function patchImageProfile(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: url 
      })
    })
    .then(checkResponse)
  }
