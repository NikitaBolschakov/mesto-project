import "../pages/index.css";

import {
  nameElement,
  jobElement,
  profileForm,
  nameInput,
  jobInput,
  avatarForm,
  titleCard,
  linkCard,
  cardContainer,
  formCardElement,
  editButton,
  closeButtonPopupEdit,
  popupEdit,
  addButton,
  closeButtonPopupAdd,
  popupAdd,
  closeButtonPopupImage,
  popupUpdate,
  closeButtonPopupUpdate,
  updateButton,
  popupImage,
  cardSaveButton,
  avatarSaveButton,
  avatarInput,
  avatarElement,
} from "./constants.js";

import { openPopup, closePopup } from "./modal.js";

import { createCard } from "./card.js";

import { disableSaveButton, enableValidation } from "./validate.js";

import {
  getProfileData,
  getCards,
  patchProfileData,
  postCard,
  patchAvatar,
  user
} from "./api.js";

//Функция создания новой карточки
const prependCard = (name, link) => {
  const card = { name, link };
  /*const userId = user._id;*/

  const cardElement = createCard(card, /*userId*/);

  //отправить на сервер
  postCard(name, link);

  cardContainer.prepend(cardElement);
};

//Функция создания аватара
const createNewAvatar = () => {
  //нашел значение поля ввода - ссылку
  const inputValue = avatarInput.value;
  //элемент, на котором буду менять backgroundImage
  avatarElement.style.backgroundImage = `url(${inputValue})`;
  //загрузил аватар на сервер
  patchAvatar(inputValue);
};

//Функция изменения данных пользователя
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  //Нашёл значения полей
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //Вставил новые значения
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
  //Отправляю на сервер новые данные
  patchProfileData(nameValue, jobValue);
  closePopup(popupEdit);
};

//Обработчик отправки формы с карточкой
formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //значение полей ввода как аргументы функции
  prependCard(titleCard.value, linkCard.value);
  //чистая форма после добавления карточки
  evt.target.reset();
  disableSaveButton(cardSaveButton);

  closePopup(popupAdd);
});

//Открыть pop-up "Редактирование профиля"
editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

//Закрыть pop-up "Редактирование профиля"
closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

//Открыть pop-up "Добавить карточку"
addButton.addEventListener("click", () => {
  openPopup(popupAdd);
});

//Закрыть pop-up "Добавить карточку"
closeButtonPopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

//Открытие папапа есть в цикле обработчика массива
//Закрыть попап с изображением
closeButtonPopupImage.addEventListener("click", () => {
  closePopup(popupImage);
});

//Открыть pop-up "Обновить аватар"
updateButton.addEventListener("click", () => {
  openPopup(popupUpdate);
});

//Закрыть pop-up "Обновить аватар"
closeButtonPopupUpdate.addEventListener("click", () => {
  closePopup(popupUpdate);
});

//обработка отправки формы изменения аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createNewAvatar();
  evt.target.reset();
  disableSaveButton(avatarSaveButton);
  closePopup(popupUpdate);
});

//Обработчик отправки формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Включить валидацию форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
});

getProfileData();
getCards();
