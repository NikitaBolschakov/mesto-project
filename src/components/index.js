import '../pages/index.css'

import { editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd,
  popupAdd, closeButtonPopupImage, popupUpdate, closeButtonPopupUpdate, updateButton, 
  popupImage, openPopup, closePopup } from './modal.js'

import { titleCard, linkCard, popupImagePicture, popupImageCaption, cardTemplate, 
  initialCards, formCardElement, createCard } from './card.js'

import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, 
  enableValidation } from './validate.js';

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__status'); 
const profileForm = document.querySelector('#popup-form-edit');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');
const avatarForm = document.querySelector('#popup-form-update'); 
const cardContainer = document.querySelector('.gallery'); 

//Обработчик массива карточек из коробки
initialCards.forEach( card => {
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
});

//Функция создания новой карточки 
const prependCard = (name, link) => {  
  const card = {name, link} 
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
}

//Обработчик отправки формы с карточкой
formCardElement.addEventListener('submit', evt => {                      
  evt.preventDefault();

  //значение полей ввода как аргументы функции 
  prependCard(titleCard.value, linkCard.value);
  
  //чистая форма после добавления карточки 
  evt.target.reset();

  closePopup(popupAdd);
});






//Открыть pop-up "Редактирование профиля"
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
});

//Закрыть pop-up "Редактирование профиля"
closeButtonPopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

//Открыть pop-up "Добавить карточку"
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

//Закрыть pop-up "Добавить карточку"
closeButtonPopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

//Открытие папапа есть в цикле обработчика массива
//Закрыть попап с изображением
closeButtonPopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

//Открыть pop-up "Обновить аватар"
updateButton.addEventListener('click', () => {
  openPopup(popupUpdate);
});

//Закрыть pop-up "Обновить аватар"
closeButtonPopupUpdate.addEventListener('click', () => {
  closePopup(popupUpdate);
});





//Функция отправки формы изменения аватара
const handleUpdateFormSubmit = (evt) => {
  evt.preventDefault();
  evt.target.reset();
  closePopup(popupUpdate);
}

//Обработчик отправки формы с обновлением аватара
avatarForm.addEventListener('submit', handleUpdateFormSubmit);






//Функция изменения данных пользователя
const handleProfileFormSubmit = (evt) => {               
  evt.preventDefault();
                     
  //Нашёл значения полей
  const nameValue = nameInput.value;    
  const jobValue = jobInput.value;
  //Вставил новые значения
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
  //Вместо отправки на сервер, просто закрываю форму
  closePopup(popupEdit);
}

//Обработчик отправки формы редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);






// Включить валидацию форм
enableValidation(); 