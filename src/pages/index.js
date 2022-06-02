import "../pages/index.css";
import {
  profileForm,
  avatarForm,
  cardContainer,
  formCardElement,
  editButton,
  popupEdit,
  nameInput,
  jobInput,
  addButton,
  popupAdd,
  popupUpdate,
  updateButton,
  popupImage,
  editSaveButton,
  cardSaveButton,
  avatarSaveButton,
  validationConfig,
} from "../components/utils/constants.js";
import { api } from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

//Здесь будет храниться объект с данными о пользователе
let user;

const userInfo = new UserInfo({
  nameElement: ".profile__name",
  statusElement: ".profile__status",
  avatarElement: ".profile__avatar",
});

//Функция создания новой карточки
const prependCard = (inputsObj) => {
  const name = inputsObj["name-image"];
  const link = inputsObj["link-image"];
  //отправить на сервер и добавить в DOM
  api
    .postCard(name, link)
    .then((data) => {
      const newCard = new Card(data, user, api, "#card", handleClickImage);
      const newCardElement = newCard.generate();
      cardContainer.prepend(newCardElement);
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
      userInfo.setUserInfo(res); //принимает новые данные пользователя и отправляет их на страницу
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
  //Отправляю на сервер новые данные
  api
    .patchProfileData(nameValue, jobValue)
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

//Эта функция принимает имя и ссылку от Сard и передает их методу open,
//а он открывает попап и вешает слушатели на esc и ovl
const handleClickImage = (name, link) => {
  popupWithImage.open(name, link);
};

//------------------------------------ попап редактирования профиля ------------------------------

const popupEditor = new PopupWithForm(popupEdit, handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  formValidators['profile'].resetValidation();
  nameInput.value = user.name;
  jobInput.value = user.about;
  popupEditor.open();
});

popupEditor.setEventListeners(); //закрыть по кнопке

//------------------------------------- попап добавления карточки ---------------------------------

const popupAddCard = new PopupWithForm(popupAdd, prependCard);
// Открыть и повесить слушатели на esc и ovl
addButton.addEventListener("click", () => {
  formValidators['add'].resetValidation();
  popupAddCard.open();
});
popupAddCard.setEventListeners(); //закрыть по кнопке

//-------------------------------------- попап открытия картинки ----------------------------------

const popupWithImage = new PopupWithImage(popupImage);
//Открытие пoпапа в классе Card
popupWithImage.setEventListeners(); //закрыть по кнопке

//------------------------------------------ попап аватара ----------------------------------------

const popupAvatar = new PopupWithForm(popupUpdate, createNewAvatar);
// Открыть и повесить слушатели на esc и ovl
updateButton.addEventListener("click", () => {
  formValidators['form-update'].resetValidation();
  popupAvatar.open();
});
popupAvatar.setEventListeners(); //закрыть по кнопке

//----------------------------------------  валидация форм ---------------------------------------

const formValidators = {};

//Включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);


//--------------------------------- получение данных пользователя и карточек------------------------

Promise.all([api.getProfileData(), api.getCards()])
  .then(([profile, cards]) => {
    user = profile;
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
