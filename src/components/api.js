/*const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "1b487e52-d8c5-49f3-ac21-d7a7885c0589",
    "Content-Type": "application/json",
  },
};

const handleRespons = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос данных о пользователе
const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleRespons);
};

// Запрос карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleRespons);
};

// Отправка данных о пользователе
const patchProfileData = (name, status) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: status,
    }),
  }).then(handleRespons);
};

//Смена аватара
const patchAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleRespons);
};

// Добавление новой карточки
const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleRespons);
};

//Удаление карточки
const deleteCard = (card_id) => {
  return fetch(`${config.baseUrl}/cards/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRespons);
};

//отправка лайка
const putLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleRespons);
};

//удаление лайка
const deleteLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleRespons);
};

export {
  getProfileData,
  getCards,
  patchProfileData,
  patchAvatar,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
};*/

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //обработчик ответа
  _handleRespons(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Запрос данных о пользователе
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleRespons);
  }

  // Запрос карточек
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleRespons);
  }

  // Отправка данных о пользователе
  patchProfileData(name, status) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: status,
      }),
    }).then(this._handleRespons);
  }

  //Смена аватара
  patchAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleRespons);
  }

  // Добавление новой карточки
  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleRespons);
  }

  //Удаление карточки
  deleteCard(card_id) {
    return fetch(`${this._baseUrl}/cards/${card_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleRespons);
  }

  //отправка лайка
  putLike(card_id) {
    return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleRespons);
  }

  //удаление лайка
  deleteLike(card_id) {
    return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleRespons);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '1b487e52-d8c5-49f3-ac21-d7a7885c0589',
    'Content-Type': 'application/json'
  }
}); 
