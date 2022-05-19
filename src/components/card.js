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











//========================================================================================


class Card {
  constructor (data/*это объект получаемой карточки*/, api, selector/*ее template-элемент*/) {
    this._name = data.name; //название карточки
    this._link = data.link; //ссылка на картинку
    this._counter = data.likes.length; //кол-во лайков
    this._id = data._id; //id карточки
    this._ownerId = data.owner._id; //id автора
    this._api = api;
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

    //добавить условие отображение лайка пользователя

    return this._element; //возвращаем полностью готовую карточку
  }

  //Метод устанавливает слушатели событий
  _setEventListeners() {
    
    //слушатель на лайк
    this._element.querySelector('.element__button-like').addEventListener("click", () => {
      this._toggleLike();
      })
    }

    //слушатель на открытие попапа с изображением
    

    //слушатель на кнопку делит
   

  //метод обработчик на лайк
  _toggleLike() {
    if (!evt.target.classList.contains("element__button-like_active")) {
      this._api.putLike(card_id)
      .then((data) => {
        this._counter.textContent = data.likes.length;
        //+ кнопке лайк добавится активный класс
      })
      .catch((err) => console.log(err))
    } else {
      this._api.deleteLike(this._id)
      .then((data) => {
        this._counter.textContent = data.likes.length;
        //+ кнопке лайк добавится неактивный класс
      })
      .catch((err) => console.log(err));
      }
  }
  //метод обработчик на открытие попапа с изображением

  
  //метод обработчик на кнопку делит


}



//для проверки написать цикл для создания экземпляра класса кард, каждой карточке в индекс.джс

/* пример из теории

messageList.forEach((item) => {
	const message = new Message(item, '.message-template_type_default');
	const messageElement = message.generate();

	document.body.append(messageElement);
});

*/

