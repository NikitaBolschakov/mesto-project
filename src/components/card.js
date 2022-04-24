import {
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  popupImage
} from "./constants.js";

import { openPopup } from "./modal.js";

//Массив карточек из коробки
import { initialCards } from "./data.js";

//Функция создания карточки из цикла
const createCard = (item) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const titleCardElement = cardElement.querySelector(".element__title");
  const imageCardElement = cardElement.querySelector(".element__image");

  titleCardElement.textContent = item.name;
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;

  //открытие попапа с изображением
  imageCardElement.addEventListener("click", () => {
    popupImagePicture.setAttribute("src", item.link);
    popupImagePicture.setAttribute("alt", item.name);
    popupImageCaption.textContent = item.name;

    openPopup(popupImage);
  });

  //лайк
  cardElement.querySelector(".element__button-like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__button-like_active");
    });

  //удаление
  const deleteButton = cardElement.querySelector(".element__button-delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
    cardElement = null;
  });

  return cardElement;
};

export { initialCards, createCard };