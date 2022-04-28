import {
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  popupImage
} from "./constants.js";

import { openPopup } from "./modal.js";

import { deleteCard, user } from "./api.js";


//Функция создания карточки 
const createCard = (card/*, userId*/) => {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const titleCardElement = cardElement.querySelector(".element__title");
  const imageCardElement = cardElement.querySelector(".element__image");
  const deleteButton = cardElement.querySelector(".element__button-delete");

  titleCardElement.textContent = card.name; //из массива кард
  imageCardElement.src = card.link;
  imageCardElement.alt = card.name;

  //кнопки удаления только на свои карточки
  /*if (card.owner._id === userId) {
    deleteButton.style.display = 'block';
  }*/

  //открытие попапа с изображением
  imageCardElement.addEventListener("click", () => {
    popupImagePicture.setAttribute("src", card.link);
    popupImagePicture.setAttribute("alt", card.name);
    popupImageCaption.textContent = card.name;

    openPopup(popupImage);
  });

  //лайк
  cardElement.querySelector(".element__button-like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__button-like_active");
    });

  //удаление
  
  
  deleteButton.addEventListener("click", () => {
    console.log(card._id)
    deleteCard(card._id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then (() => {
      cardElement.remove();
      cardElement = null;
    })
    .catch((err) => {
      console.log(err);
    });
  });

  return cardElement;
};

export { createCard };