//get запрос на получение информации о профиле
export function getProfile() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a'
      }
    })
    .then(res => res.json())
    .then((result) => {
      return result;
    });
  }
// path запрос на обновление профиля
export function patchProfile(name, description) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    });
  }

  //get запрос на получение информации о карточка
  export function getCards() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards', {
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a'
      }
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
    return fetch('https://nomoreparties.co/v1/wff-cohort-16/cards ', {
      method: 'POST',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: url
      })
    });
  }
  
  //delete запрос на удаление карточки
export  function deleteCards(cardId) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      }
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
    return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      }
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
    return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      }
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
    return fetch('https://nomoreparties.co/v1/wff-cohort-16/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '4c76b053-cbba-4436-8bfa-d0df16cf432a',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
        
      })
    });
  }
