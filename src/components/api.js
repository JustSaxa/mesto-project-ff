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
  