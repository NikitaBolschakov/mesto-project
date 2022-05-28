import "../pages/index.css";
import {
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
} from "./constants.js";
import Card from "./card.js";
import FormValidator from "./validate.js";
import { api } from "./api.js";
import { renderLoading } from "./utils.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

//Здесь будет храниться объект с данными о пользователе
let user;

const userInfo = new UserInfo({
  nameElement: ".profile__name",
  statusElement: ".profile__status",
  avatarElement: ".profile__avatar",
  nameField: "#field-name",
  statusField: "#field-job",
});
/*
//Функция очистки формы
export const resetForm = (form) => {
  form.reset();
};
*/
//Функция создания новой карточки
const prependCard = (inputsArr) => {
  const name = inputsArr[0].value;
  const link = inputsArr[1].value;
  //отправить на сервер и добавить в DOM
  api
    .postCard(name, link)
    .then((data) => {
      const newCard = new Card(data, user, api, "#card", handleClickImage);
      const newCardElement = newCard.generate();
      cardContainer.prepend(newCardElement);
      console.log(popupAddCard);
      popupAddCard.close();
      console.log(popupAddCard.close());
      addCardValidation.disableSaveButton(cardSaveButton);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardSaveButton);
    });
};

//Функция создания аватара
const createNewAvatar = (inputsArr) => {
  const inputValue = inputsArr[0].value;

  //загрузил аватар на сервер
  api
    .patchAvatar(inputValue)
    .then((res) => {
      userInfo.setUserInfo(res); //принимает новые данные пользователя и отправляет их на страницу
      popupAvatar.close();
      avatarUpdateValidation.disableSaveButton(avatarSaveButton);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarSaveButton);
    });
}

//Функция изменения данных пользователя
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, editSaveButton);
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //Отправляю на сервер новые данные
  api
    .patchProfileData(nameValue, jobValue)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditor.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editSaveButton);
    });
};
/*
//Обработчик отправки формы с карточкой
formCardElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, cardSaveButton);
  //значение полей ввода как аргументы функции
  prependCard(titleCard.value, linkCard.value);
});
*/
/*
//Обработчик отправки формы изменения аватара
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarSaveButton);
  createNewAvatar();
});
*/
//Обработчик отправки формы редактирования профиля
profileForm.addEventListener("submit", handleProfileFormSubmit);

//------------------------------------ попап редактирования профиля ------------------------------

const popupEditor = new Popup(popupEdit);
// Открыть и повесить слушатели на esc и ovl
editButton.addEventListener("click", () => {
  popupEditor.open();
});

popupEditor.setEventListeners(closeButtonPopupEdit); //закрыть по кнопке

//------------------------------------- попап добавления карточки ---------------------------------

const popupAddCard = new PopupWithForm(popupAdd, prependCard);
// Открыть и повесить слушатели на esc и ovl
addButton.addEventListener("click", () => {
  popupAddCard.open();
});
popupAddCard.setEventListeners(closeButtonPopupAdd, cardSaveButton); //закрыть по кнопке

//-------------------------------------- попап открытия картинки ----------------------------------

const popupWithImage = new PopupWithImage(popupImage);
//Открытие пoпапа в классе Card
//Эта функция принимает имя и ссылку от Сard и передает их методу open,
//а он открывает попап и вешает слушатели на esc и ovl
const handleClickImage = (name, link) => {
  //может тут просто в класс кард функциию этого класса занести?
  popupWithImage.open(name, link);
};

popupWithImage.setEventListeners(closeButtonPopupImage); //закрыть по кнопке

//------------------------------------------ попап аватара ----------------------------------------

const popupAvatar = new PopupWithForm(popupUpdate, createNewAvatar);
// Открыть и повесить слушатели на esc и ovl
updateButton.addEventListener("click", () => {
  popupAvatar.open();
});
popupAvatar.setEventListeners(closeButtonPopupUpdate, avatarSaveButton); //закрыть по кнопке

//----------------------------------------  валидация форм ---------------------------------------

// Включить валидацию всех трех форм
const profileValidation = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button-submit",
    inactiveButtonClass: "popup__button-submit_inactive",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  },
  profileForm
);

const avatarUpdateValidation = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button-submit",
    inactiveButtonClass: "popup__button-submit_inactive",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  },
  avatarForm
);

const addCardValidation = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button-submit",
    inactiveButtonClass: "popup__button-submit_inactive",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  },
  formCardElement
);

profileValidation.enableValidation();
addCardValidation.enableValidation();
avatarUpdateValidation.enableValidation();

//--------------------------------- получение данных пользователя и карточек------------------------

Promise.all([api.getProfileData(), api.getCards()])
  .then(([profile, cards]) => {
    user = profile; //переопределили переменную user
    const cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = new Card(item, user, api, "#card", handleClickImage);
          const cardElement = card.generate();
          cardList.addItem(cardElement); //карточка добавляется в контейнер
        },
      },
      ".gallery"
    );

    cardList.renderItems(cards); //добавляем карточки в созданный контейнер (классом Section)
    userInfo.setUserInfo(profile); //принимает новые даннные пользователя и отправляет их на страницу
  })
  .catch((err) => {
    console.log(err);
  });

//--------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------

/*
Схема работы класса Section:
1) Из api получаем массив карточек (в конце файла)
2) Передаем массив в метод renderItems()
3) В нем проходим по каждой карточке и выполняем инструкцию renderer, она описана в index
4) Колбек renderer создает экземпляр класса Card, генерирует карточку и передает ее методу addItem()
5) Метод addItem() добавляет ее в разметку

Задача: подставить массив с карточками при создании new Section,
пока через переопределение let objCards, не получается - Дебаггер пишет: _renderedItems: undefined
*/
