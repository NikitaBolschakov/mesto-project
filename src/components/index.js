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

import Card from "./card.js";

import { disableSaveButton, enableValidation } from "./validate.js";

import { api } from "./api.js";

import { renderLoading } from "./utils.js";

//эти функции теперь методы класса card, хотя возможно потом их нужно будет перенести в index

/*
//Функция вызова запроса удаления карточки
const callRequestDeleteCard = (cardId, element) => {
  api.deleteCard(cardId)
    .then(
      removeCard(element)
    )
    .catch((err) => {
      console.log(err);
    });
};

//Функция вызова запроса постановки лайка
const callRequestPutLike = (cardId, element) => {
  api.putLike(cardId)
    .then((res) => {
      addLike(res, element)
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция вызова запроса удаления лайка
const callRequestDeleteLike = (cardId, element) => {
  api.deleteLike(cardId)
    .then((res) => {
      removeLike(res, element)
    })
    .catch((err) => {
      console.log(err);
    });
};*/

let user; //здесь будет храниться объект с данными о пользователе

//Функция очистки формы
const resetForm = (form) => {
  form.reset();
};

// Использование полученных данных о пользователе
const renderProfileData = (data) => {
  nameElement.textContent = data.name;
  jobElement.textContent = data.about;
  nameInput.value = data.name;
  jobInput.value = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};

//Функция создания новой карточки
const prependCard = (name, link) => {
  //отправить на сервер и добавить в DOM
  api.postCard(name, link)
    .then((data) => {
      const newCard = new Card(data, user, api, '#card');
      const newCardElement = newCard.generate();
      cardContainer.prepend(newCardElement);
      closePopup(popupAdd);
      resetForm(formCardElement);
      disableSaveButton(cardSaveButton);
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
  const inputValue = avatarInput.value;
  //загрузил аватар на сервер
  api.patchAvatar(inputValue)
    .then((res) => {
      renderProfileData(res);
      avatarElement.style.backgroundImage = `url(${inputValue})`;
      closePopup(popupUpdate);
      resetForm(avatarForm);
      disableSaveButton(avatarSaveButton);
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
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //Отправляю на сервер новые данные
  api.patchProfileData(nameValue, jobValue)
    .then((res) => {
      renderProfileData(res);
      nameElement.textContent = nameValue;
      jobElement.textContent = jobValue;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editSaveButton);
    });
};

//Обработчик отправки формы с карточкой
formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, cardSaveButton);
  //значение полей ввода как аргументы функции
  prependCard(titleCard.value, linkCard.value);
});

//Обработчик отправки формы изменения аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarSaveButton);
  createNewAvatar();
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


Promise.all([api.getProfileData(), api.getCards()]) 
  .then(([profile, cards]) => {
    user = profile; //переопределили переменную user
    //"при положительном ответе": отдай массив из полученных значений
    renderProfileData(profile); //отредактируй данные профиля используя значение user
    //создать для каждой карточки экземпляр класса
    cards.forEach((element) => {
      const newCard = new Card(element, user, api, '#card');
      const newCardElement = newCard.generate();
      //пройдись по полученному объекту, добавь в DOM каждую карточку
      cardContainer.append(newCardElement)
    });
  })
  .catch((err) => {
    console.log(err);
  });
