import {
  popupImagePicture,
  popupImageCaption,
  popupImage,
} from "./constants.js";

import { openPopup } from "./modal.js";
/*
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



*/

//========================================================================================


export default class Card {
  constructor (data, user, api, selector) {
    this._name = data.name; //название карточки
    this._link = data.link; //ссылка на картинку
    this._likes = data.likes; //массив лайков
    this._counter = data.likes.length; //кол-во лайков
    this._id = data._id; //id карточки
    this._userId = user._id;
    this._ownerId = data.owner._id; //id автора
    this._api = api; //запросы апи
    this._selector = selector; //разметка карточки
  }

  //Метод возвращает элемент из разметки
  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  //Генерация карточки
  generate() {
    this._element = this._getElement(); //взяли элемент из разметки
    this._setEventListeners(); //установили на карточку все слушатели

    //теперь в пустую разметку добавляем полученные данные карточки
    this._element.querySelector('.element__title').textContent = this._name //название
    this._element.querySelector('.element__image').alt = this._name //название в атрибут alt
    this._element.querySelector('.element__image').src = this._link //картинка
    this._element.querySelector('.element__counter').textContent = this._counter //кол-во лайков

    //добавить условие появления кнопки делит
    if (this._ownerId === this._userId) {
      this._element.querySelector(".element__button-delete").style.display = "block";
    }
    
    //проверка массива this._likes на наличие лайка пользователя
    const isUserLiked = this._likes.some((user) => {
      return this._userId === user._id;
    });

    //активируй лайк если колбек вернул true
    if (isUserLiked) {
      this._element.querySelector('.element__button-like').classList.add("element__button-like_active");
    }

    return this._element; //возвращаем полностью готовую карточку
  }

  

  //Метод устанавливает слушатели событий
  _setEventListeners() {
    
    //слушатель на лайк
    this._element.querySelector('.element__button-like').addEventListener("click", () => {
      this._handleToggleLike();
      })
    

    //слушатель на открытие попапа с изображением
    this._element.querySelector('.element__image').addEventListener("click", () => {
      this._handleOpenPopup();
      })

    //слушатель на кнопку делит
    this._element.querySelector('.element__button-delete').addEventListener("click", () => {
      this._handleRemoveCard();
      })

   }

  //метод обработчик на лайк
  _handleToggleLike() {
    if (this._element.querySelector('.element__button-like').classList.contains("element__button-like_active")) {
      this._api.deleteLike(this._id)
      .then((data) => {
        this._element.querySelector('.element__counter').textContent = data.likes.length;
        this._element.querySelector('.element__button-like').classList.remove('element__button-like_active');
      })
      .catch((err) => console.log(err))
    } else {
      this._api.putLike(this._id)
      .then((data) => {
        this._element.querySelector('.element__counter').textContent = data.likes.length;
        this._element.querySelector('.element__button-like').classList.add('element__button-like_active');
      })
      .catch((err) => console.log(err));
      }
  }
  
  //метод обработчик на открытие попапа с изображением
  _handleOpenPopup() {
    popupImagePicture.setAttribute('src', this._link);
    popupImagePicture.setAttribute('alt', this._name);
    popupImageCaption.textContent = this._name;

    openPopup(popupImage);
  }

  //Метод удаления карточки из DOM - почему-то не работает с ним
  /*_removeCard(card) {
    card.remove();
    card = null;
  };*/

  //метод обработчик на кнопку делит
  _handleRemoveCard() {
      this._api.deleteCard(this._id)
        .then(
          this._element.remove(),
          this._element = null
        )
        .catch((err) => {
          console.log(err);
        });
  };
}

//добавить константы