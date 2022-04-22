const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('#close-popup-edit');
const popupEdit = document.querySelector('#popup-edit');
const addButton = document.querySelector('.profile__button-add');
const closeButtonPopupAdd = document.querySelector('#close-popup-add');
const popupAdd = document.querySelector('#popup-add');
const closeButtonPopupImage = document.querySelector('#close-popup-image');
const popupUpdate = document.querySelector('#popup-update');
const closeButtonPopupUpdate = document.querySelector('#close-popup-update');
const updateButton = document.querySelector('.profile__ovl');
const popupImage = document.querySelector('#popup-image');

//Импорт утилитарных функций
import { page, popupItems, openPopup, closePopup } from './utils.js'

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

export { editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd,
  popupAdd, closeButtonPopupImage, popupUpdate, closeButtonPopupUpdate, updateButton, popupImage, openPopup }