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

import { createCard, addLike, removeLike, removeCard  } from "./card.js";

import { disableSaveButton, enableValidation } from "./validate.js";

import {
  /*getProfileData,
  getCards,
  patchProfileData,
  postCard,
  patchAvatar,
  deleteCard,
  putLike,
  deleteLike,*/
  api
} from "./api.js";

import { renderLoading } from "./utils.js";

//Функция вызова запроса удаления карточки
const callRequestDeleteCard = (cardId, element) => {
  deleteCard(cardId)
    .then(
      removeCard(element)
    )
    .catch((err) => {
      console.log(err);
    });
};

//Функция вызова запроса постановки лайка
const callRequestPutLike = (cardId, element) => {
  putLike(cardId)
    .then((res) => {
      addLike(res, element)
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция вызова запроса удаления лайка
const callRequestDeleteLike = (cardId, element) => {
  deleteLike(cardId)
    .then((res) => {
      removeLike(res, element)
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  postCard(name, link)
    .then((res) => {
      cardContainer.prepend(
        createCard(
          res,
          res.owner._id,
          callRequestPutLike,
          callRequestDeleteLike,
          callRequestDeleteCard
        )
      );
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
  patchAvatar(inputValue)
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
  patchProfileData(nameValue, jobValue)
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

// Связываю два промиса, получаю из getProfileData() "user._id" для createCard()
Promise.all([api.getProfileData(), api.getCards()]) //Когда выполнятся два запроса
  .then(([profile, cards]) => {
    //"при положительном ответе": отдай массив из полученных значений
    renderProfileData(profile); //отредактируй данные профиля используя значение user
    cards.forEach((card) => {
      //пройдись по полученному объекту, добавь в DOM каждую карточку
      cardContainer.append(createCard(card, profile._id, callRequestPutLike,
        callRequestDeleteLike, callRequestDeleteCard))
    });
  })
  .catch((err) => {
    //"при отрицательном ответе": выведи ошибку в консоль
    console.log(err);
  });
