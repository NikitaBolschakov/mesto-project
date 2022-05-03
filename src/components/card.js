import {
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  popupImage
} from "./constants.js";

import { openPopup } from "./modal.js";

import { callRequestDeleteCard, callRequestPutLike, callRequestDeleteLike } from "./index.js";

//Функция создания карточки
const createCard = (card, userId) => {
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
      //точка расширения
      callRequestPutLike(card._id, cardElement);
    }
    else {
      //точка расширения
      callRequestDeleteLike(card._id, cardElement);
    }
  });

  //проверка массива card.likes на наличие лайка пользователя
  const isUserLiked = card.likes.some((user) => {
    return user._id === userId;
  })

  //активируй лайк если колбек вернул true
  if (isUserLiked) {
    likeButton.classList.add("element__button-like_active");
  }
  
  deleteButton.addEventListener("click", () => {
    callRequestDeleteCard(card._id, cardElement);
  });

  //кнопки удаления только на свои карточки
  if (card.owner._id === userId) {
    deleteButton.style.display = "block";
  }
  return cardElement;
};

export { createCard };