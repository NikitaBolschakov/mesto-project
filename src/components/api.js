import {
  nameElement,
  jobElement,
  avatarElement,
  nameInput,
  jobInput
} from "./constants.js";


const config = {
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
  return Promise.reject(`Ошибка: ${res.status}`)
}

// Использование полученных данных о пользователе
const renderProfileData = (data) => {
  nameElement.textContent = data.name;
  jobElement.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
  nameInput.value = data.name;
  jobInput.value = data.about;
};

// Запрос данных о пользователе
const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleRespons)
};

// Запрос карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(handleRespons)
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
  })
    .then(handleRespons)
};

//Смена аватара
const patchAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then(handleRespons)
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
  })
    .then(handleRespons)
};

//Удаление карточки
const deleteCard = (card_id) => {
  return fetch(`${config.baseUrl}/cards/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleRespons)
};

//отправка лайка
const putLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: "PUT",
    headers: config.headers
  })
  .then(handleRespons)
}

//удаление лайка
const deleteLike = (card_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${card_id}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(handleRespons)
}

export {
  renderProfileData,
  getProfileData,
  getCards,
  patchProfileData,
  patchAvatar,
  postCard,
  deleteCard,
  putLike,
  deleteLike
};
