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
  editSaveButton,
  cardSaveButton,
  avatarSaveButton,
  avatarInput,
  avatarElement,
} from "./constants.js";

import { openPopup, closePopup } from "./modal.js";

import { createCard } from "./card.js";

import { disableSaveButton, enableValidation } from "./validate.js";

import {
  renderProfileData,
  getProfileData,
  getCards,
  patchProfileData,
  postCard,
  patchAvatar,
} from "./api.js";

import { renderLoading } from "./utils.js";

//Функция создания новой карточки
const prependCard = (name, link) => {
  //отправить на сервер и добавить в DOM
  postCard(name, link)
    .then((res) => {
      cardContainer.prepend(createCard(res, res.owner._id));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardSaveButton);
    });
};

//Функция создания аватара
const createNewAvatar = () => {
  //нашел значение поля ввода - ссылку
  const inputValue = avatarInput.value;
  //элемент, на котором буду менять backgroundImage
  avatarElement.style.backgroundImage = `url(${inputValue})`;
  //загрузил аватар на сервер
  patchAvatar(inputValue)
    .then((res) => {
      renderProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSaveButton);
    });
};

//Функция изменения данных пользователя
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, editSaveButton);
  //Нашёл значения полей
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //Вставил новые значения
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
  //Отправляю на сервер новые данные
  patchProfileData(nameValue, jobValue)
    .then((res) => {
      renderProfileData(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editSaveButton);
    });
  closePopup(popupEdit);
};

//Обработчик отправки формы с карточкой
formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, cardSaveButton);
  //значение полей ввода как аргументы функции
  prependCard(titleCard.value, linkCard.value);
  //чистая форма после добавления карточки
  evt.target.reset();
  disableSaveButton(cardSaveButton);
  closePopup(popupAdd);
});

//Обработчик отправки формы изменения аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarSaveButton);
  createNewAvatar();
  evt.target.reset();
  disableSaveButton(avatarSaveButton);
  closePopup(popupUpdate);
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

// Связываю два промиса, получаю из getProfileData() "user._id" для createCard()
Promise.all([getProfileData(), getCards()]) //Когда выполнятся два запроса
  .then(([profile, cards]) => {             //"при положительном ответе": отдай массив из полученных значений
    renderProfileData(profile);             //отредактируй данные профиля используя значение user
    cards.forEach((card) => {               //пройдись по полученному объекту, добавь в DOM каждую карточку
      cardContainer.append(createCard(card, profile._id));
    });
  })
  .catch((err) => {                         //"при отрицательном ответе": выведи ошибку в консоль
    console.log(err);
  });