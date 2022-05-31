import "../pages/index.css";
import {
  profileForm,
  avatarForm,
  cardContainer,
  formCardElement,
  editButton,
  popupEdit,
  addButton,
  popupAdd,
  popupUpdate,
  updateButton,
  popupImage,
  editSaveButton,
  cardSaveButton,
  avatarSaveButton,
  validationConfig
} from "./constants.js";
import { renderLoading } from "./utils.js";
import { api } from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
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
      popupAddCard.close();
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
};

//Функция изменения данных пользователя
const handleProfileFormSubmit = (inputsArr) => {
  const nameValue = inputsArr[0].value;
  const jobValue = inputsArr[1].value;
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

//Эта функция принимает имя и ссылку от Сard и передает их методу open,
//а он открывает попап и вешает слушатели на esc и ovl
const handleClickImage = (name, link) => {
  popupWithImage.open(name, link);
};

//------------------------------------ попап редактирования профиля ------------------------------

const popupEditor = new PopupWithForm(popupEdit, handleProfileFormSubmit);
// Открыть и повесить слушатели на esc и ovl
editButton.addEventListener("click", () => {
  popupEditor.open();
});

popupEditor.setEventListeners(profileForm); //закрыть по кнопке

//------------------------------------- попап добавления карточки ---------------------------------

const popupAddCard = new PopupWithForm(popupAdd, prependCard);
// Открыть и повесить слушатели на esc и ovl
addButton.addEventListener("click", () => {
  popupAddCard.open();
});
popupAddCard.setEventListeners(formCardElement); //закрыть по кнопке

//-------------------------------------- попап открытия картинки ----------------------------------

const popupWithImage = new PopupWithImage(popupImage);
//Открытие пoпапа в классе Card
popupWithImage.setEventListeners(); //закрыть по кнопке

//------------------------------------------ попап аватара ----------------------------------------

const popupAvatar = new PopupWithForm(popupUpdate, createNewAvatar);
// Открыть и повесить слушатели на esc и ovl
updateButton.addEventListener("click", () => {
  popupAvatar.open();
});
popupAvatar.setEventListeners(avatarForm); //закрыть по кнопке

//----------------------------------------  валидация форм ---------------------------------------

// Включить валидацию всех трех форм
const profileValidation = new FormValidator(validationConfig,profileForm);
const avatarUpdateValidation = new FormValidator(validationConfig, avatarForm);
const addCardValidation = new FormValidator(validationConfig, formCardElement);

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
