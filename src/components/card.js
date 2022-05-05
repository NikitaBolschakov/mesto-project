import {
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  popupImage,
} from "./constants.js";

import { openPopup } from "./modal.js";

//Функция удаления карточки из DOM
const removeCard = (card) => {
  card.remove();
  card = null;
};

//Функция рендеринга "Лайк добавлен"
const addLike = (arr, element) => {
  const likeCounter = element.querySelector(".element__counter");
  const likeButton = element.querySelector(".element__button-like");
  likeButton.classList.add("element__button-like_active");
  likeCounter.textContent = arr.likes.length;
};

//Функция рендеринга "Лайк снят"
const removeLike = (arr, element) => {
  const likeCounter = element.querySelector(".element__counter");
  const likeButton = element.querySelector(".element__button-like");
  likeButton.classList.remove("element__button-like_active");
  likeCounter.textContent = arr.likes.length;
};

//Функция создания карточки
const createCard = (card, userId, pressLike, delLike, delCard ) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const titleCardElement = cardElement.querySelector(".element__title");
  const imageCardElement = cardElement.querySelector(".element__image");
  const deleteButton = cardElement.querySelector(".element__button-delete");
  const likeCounter = cardElement.querySelector(".element__counter");
  const likeButton = cardElement.querySelector(".element__button-like");

  titleCardElement.textContent = card.name;
  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;
  likeCounter.textContent = card.likes.length;

  //открытие попапа с изображением
  imageCardElement.addEventListener("click", () => {
    popupImagePicture.setAttribute("src", card.link);
    popupImagePicture.setAttribute("alt", card.name);
    popupImageCaption.textContent = card.name;

    openPopup(popupImage);
  });

  //лайки
  likeButton.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("element__button-like_active")) {
      pressLike(card._id, cardElement);
    } else {
      delLike(card._id, cardElement);
    }
  });

  //проверка массива card.likes на наличие лайка пользователя
  const isUserLiked = card.likes.some((user) => {
    return user._id === userId;
  });

  //активируй лайк если колбек вернул true
  if (isUserLiked) {
    likeButton.classList.add("element__button-like_active");
  }

  deleteButton.addEventListener("click", () => {
    delCard(card._id, cardElement);
  });

  //кнопки удаления только на свои карточки
  if (card.owner._id === userId) {
    deleteButton.style.display = "block";
  }
  return cardElement;
};

export { createCard, addLike, removeLike, removeCard };