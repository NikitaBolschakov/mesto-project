import {
  nameElement,
  jobElement,
  avatarElement,
  cardContainer,
} from "./constants.js";

import { createCard } from "./card";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-9",
  headers: {
    authorization: "1b487e52-d8c5-49f3-ac21-d7a7885c0589",
    "Content-Type": "application/json",
  },
};

let user;

// Использование полученных данных о пользователе
const renderProfileData = (data) => {
  console.log(data._id);
  user = data._id; 
  nameElement.textContent = data.name;
  jobElement.textContent = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};


// Запрос данных о пользователе
const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      renderProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    });
};



// Запрос карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      res.forEach((card) => {
        const cardElement = createCard(card /*user._id*/);
        cardContainer.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      renderProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      renderProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    });
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Удаление карточки
const deleteCard = (card_id) => {
  return fetch(`${config.baseUrl}/cards/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
  });
  //методы .then в createCard
};

export {
  getProfileData,
  getCards,
  patchProfileData,
  patchAvatar,
  postCard,
  deleteCard,
  user,
};
