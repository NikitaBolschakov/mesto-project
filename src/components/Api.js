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
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "1b487e52-d8c5-49f3-ac21-d7a7885c0589",
    "Content-Type": "application/json",
  },
});
