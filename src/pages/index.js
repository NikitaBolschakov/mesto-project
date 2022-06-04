import "../pages/index.css";
import {
  editButton,
  popupEdit,
  nameInput,
  jobInput,
  addButton,
  popupAdd,
  popupUpdate,
  updateButton,
  popupImage,
  validationConfig,
} from "../components/utils/constants.js";
import { api } from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

let user; // объект с данными о пользователе

const userInfo = new UserInfo({
  nameElement: ".profile__name",
  statusElement: ".profile__status",
  avatarElement: ".profile__avatar",
});

const cardList = new Section(
  {
    //теперь, по сути, это функция createCard, без вставки элемента в DOM
    renderer: (item) => {
      const card = new Card(item, user, api, "#card", handleClickImage);
      const cardElement = card.generate();
      return cardElement;
    },
  },
  ".gallery"
);

//Функция создания новой карточки
const prependCard = (inputsObj) => {
  const name = inputsObj["name-image"];
  const link = inputsObj["link-image"];
  //отправить на сервер и добавить в DOM
  api
    .postCard(name, link)
    .then((data) => {
      cardList.prependItem(data);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false, "Создать");
    });
};

//Функция создания аватара
const createNewAvatar = (inputsObj) => {
  const inputValue = inputsObj.avatar;
  //загрузил аватар на сервер
  api
    .patchAvatar(inputValue)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false, "Сoхранить");
    });
};

//Функция изменения данных пользователя
const handleProfileFormSubmit = (inputsObj) => {
  const nameValue = inputsObj.name;
  const jobValue = inputsObj.status;

  api
    .patchProfileData(nameValue, jobValue) //Отправляем на сервер новые данные
    .then((res) => {
      user = res;
      userInfo.setUserInfo(res);
      popupEditor.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditor.renderLoading(false, "Сoхранить");
    });
};

//Принимает имя и ссылку от Сard и передает их методу open
const handleClickImage = (name, link) => {
  popupWithImage.open(name, link);
};

//------------------------------------ попап редактирования профиля ------------------------------

const popupEditor = new PopupWithForm(popupEdit, handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  nameInput.value = user.name;
  jobInput.value = user.about;
  popupEditor.open();
});

popupEditor.setEventListeners();

//------------------------------------- попап добавления карточки ---------------------------------

const popupAddCard = new PopupWithForm(popupAdd, prependCard);

addButton.addEventListener("click", () => {
  formValidators["add"].resetValidation();
  popupAddCard.open();
});

popupAddCard.setEventListeners();

//-------------------------------------- попап открытия картинки ----------------------------------

const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

//------------------------------------------ попап аватара ----------------------------------------

const popupAvatar = new PopupWithForm(popupUpdate, createNewAvatar);

updateButton.addEventListener("click", () => {
  formValidators["form-update"].resetValidation();
  popupAvatar.open();
});

popupAvatar.setEventListeners();

//----------------------------------------  валидация форм ---------------------------------------

const formValidators = {};

//Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute("name"); //получаем данные из атрибута `name` у формы
    formValidators[formName] = validator; //вот тут в объект записываем под именем формы
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//--------------------------------- получение данных пользователя и карточек------------------------

Promise.all([api.getProfileData(), api.getCards()])
  .then(([profile, cards]) => {
    user = profile;
    cardList.renderItems(cards); //добавляем карточки в созданный контейнер (метод класса Section)
    userInfo.setUserInfo(profile); //принимает новые даннные пользователя и отправляет их на страницу
  })
  .catch((err) => {
    console.log(err);
  });
