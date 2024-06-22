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
    .then(res => res.json())
    .then((result) => {
      return result;
    });
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
    });
  }

  //get запрос на получение информации о карточка
  export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
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
    });
  }

  //delete запрос на удаление карточки
export  function deleteCards(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }

// put запрос на поставку лайка
  export  function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }

// delete запрос на удаления лайка
  export  function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    });
  }

  //path запрос изменение картинки профиля
  export function patchImageProfile(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: url 
      })
    });
  }
