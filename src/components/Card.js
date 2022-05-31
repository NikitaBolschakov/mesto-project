export default class Card {
  constructor(data, user, api, selector, handleClickImage) {
    this._name = data.name; //название карточки
    this._link = data.link; //ссылка на картинку
    this._likes = data.likes; //массив лайков
    this._counter = data.likes.length; //кол-во лайков
    this._id = data._id; //id карточки
    this._userId = user._id;
    this._ownerId = data.owner._id; //id автора
    this._api = api; //запросы апи
    this._selector = selector; //разметка карточки
    this._handleClickImage = handleClickImage; //колбек, открывает попап с картинкой
  }

  //Метод возвращает элемент из разметки
  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //Генерация карточки
  generate() {
    this._element = this._getElement(); //взяли элемент из разметки
    this._setEventListeners(); //установили на карточку все слушатели

    //DOM элементы карточки
    this._titleCardElement = this._element.querySelector(".element__title");
    this._likeCounter = this._element.querySelector(".element__counter");

    //теперь в шаблон разметки добавляем полученные данные карточки
    this._titleCardElement.textContent = this._name; //название
    this._imageCardElement.alt = this._name; //название в атрибут alt
    this._imageCardElement.src = this._link; //картинка
    this._likeCounter.textContent = this._counter; //кол-во лайков

    //добавляем условие появления кнопки делит
    if (this._ownerId === this._userId) {
      this._deleteButton.style.display = "block";
    }

    //проверка массива this._likes на наличие лайка пользователя
    const isUserLiked = this._likes.some((user) => {
      return this._userId === user._id;
    });

    //активируем лайк если isUserLiked = true
    if (isUserLiked) {
      this._likeButton.classList.add("element__button-like_active");
    }

    return this._element; //возвращаем полностью готовую карточку
  }

  //Метод устанавливает слушатели событий
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__button-like");
    this._deleteButton = this._element.querySelector(".element__button-delete");
    this._imageCardElement = this._element.querySelector(".element__image");
    //слушатель на лайк
    this._likeButton.addEventListener("click", () => {
        this._handleToggleLike();
      });
    //слушатель на открытие попапа с изображением
    this._imageCardElement.addEventListener("click", () => {
        this._handleClickImage(this._name, this._link);
      });
    //слушатель на кнопку делит
    this._deleteButton.addEventListener("click", () => {
        this._handleRemoveCard();
      });
  }

  //метод обработчик на лайк
  _handleToggleLike() {
    if (
      this._likeButton.classList.contains("element__button-like_active")
    ) {
      this._api
        .deleteLike(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.remove("element__button-like_active");
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .putLike(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this._likeButton.classList.add("element__button-like_active");
        })
        .catch((err) => console.log(err));
    }
  }
  //Метод удаления карточки из DOM
  _removeCard(card) {
    card.remove();
    card = null;
  }

  //метод обработчик на кнопку делит
  _handleRemoveCard() {
    this._api
      .deleteCard(this._id)
      .then(() => this._removeCard(this._element))
      .catch((err) => {
        console.log(err);
      });
  }
}
