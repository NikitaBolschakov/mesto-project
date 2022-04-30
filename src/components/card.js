import {
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  popupImage,
} from "./constants.js";

import { openPopup } from "./modal.js";

import { deleteCard, putLike, deleteLike } from "./api.js";

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
      putLike(card._id)
        .then((res) => {
          likeButton.classList.add("element__button-like_active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(card._id)
        .then((res) => {
          likeButton.classList.remove("element__button-like_active");
          likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
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

  //удаление карточки
  deleteButton.addEventListener("click", () => {
    deleteCard(card._id)
      .then(() => {
        cardElement.remove();
        cardElement = null;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //кнопки удаления только на свои карточки
  if (card.owner._id === userId) {
    deleteButton.style.display = "block";
  }

  return cardElement;
};

export { createCard };