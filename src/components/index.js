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
  avatarInput
} from "./constants.js";

import { openPopup, closePopup } from "./modal.js";

import Card from "./card.js";

import FormValidator from "./validate.js";

import { api } from "./api.js";

import { renderLoading } from "./utils.js";

<<<<<<< HEAD
import Section from "./Section.js";

//Здесь будет храниться объект с данными о пользователе
let user; 
//let cards;

=======
import UserInfo from "./UserInfo.js";
>>>>>>> 3dfcb22307dd3cdfdf21c4961119e650ae78a768

//эти функции теперь методы класса card, хотя возможно потом их нужно будет перенести в index
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


//При инициализации класса передается объект карточек, полученный от api и функция для отрисовки каждой карточки




const userInfo = new UserInfo({
  nameElement: '.profile__name',
  statusElement: '.profile__status',
  avatarElement: '.profile__avatar',
  nameField: '#field-name',
  statusField: '#field-job'
});

//Функция очистки формы
const resetForm = (form) => {
  form.reset();
};

/*Теперь это делает класс UserInfo.setUserInfo()

// Использование полученных данных о пользователе
const renderProfileData = (data) => {
  nameElement.textContent = data.name;
  jobElement.textContent = data.about;
  nameInput.value = data.name;
  jobInput.value = data.about;
  avatarElement.style.backgroundImage = `url(${data.avatar})`;
};*/

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
const createNewAvatar = () => {
  const inputValue = avatarInput.value;
  //загрузил аватар на сервер
  api.patchAvatar(inputValue)
    .then((res) => {
      //renderProfileData(res);  //теперь это делает UserInfo.setUserInfo
      userInfo.setUserInfo(res); //принимает новые данные пользователя и отправляет их на страницу
      closePopup(popupUpdate);
      resetForm(avatarForm);
      addCardValidation.disableSaveButton(avatarSaveButton);
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
      //renderProfileData(res); //теперь это делает UserInfo.setUserInfo
      userInfo.setUserInfo(res);
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
  (popupEdit);
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

// Включить валидацию всех трех форм
const profileValidation = new FormValidator({
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
}, profileForm);

const avatarUpdateValidation = new FormValidator({
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
}, avatarForm);

const addCardValidation = new FormValidator({
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
}, formCardElement);

profileValidation.enableValidation();
addCardValidation.enableValidation();
avatarUpdateValidation.enableValidation();

Promise.all([api.getProfileData(), api.getCards()]) 
  .then(([profile, cards]) => {
    user = profile; //переопределили переменную user
<<<<<<< HEAD
    
    const cardList = new Section({data: cards,
      renderer: (item) => {
        const card = new Card(item, user, api, '#card');
        const cardElement = card.generate();
    
        cardList.addItem(cardElement); //карточка добавляется в контейнер
      }},
      ".gallery"
    )

    //"при положительном ответе": отдай массив из полученных значений
    renderProfileData(profile); //отредактируй данные профиля используя значение user

    cardList.renderItems(cards); // добавляем карточки в созданный контейнер (классом Section)
    
    // Это теперь делает класс Section
=======
    //renderProfileData(profile); //теперь это делает UserInfo.setUserInfo
    userInfo.setUserInfo(profile);  //принимает новые даннные пользователя и отправляет их на страницу

>>>>>>> 3dfcb22307dd3cdfdf21c4961119e650ae78a768
    //создать для каждой карточки экземпляр класса
    /*cards.forEach((element) => {
      const newCard = new Card(element, user, api, '#card');
      const newCardElement = newCard.generate();
      //пройдись по полученному объекту, добавь в DOM каждую карточку
      //cardContainer.append(newCardElement)
      //// или cardList.addItem(newCardElement);
    });*/
    
  })
  .catch((err) => {
    console.log(err);
  });









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
