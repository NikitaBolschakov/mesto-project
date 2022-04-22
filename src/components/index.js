import '../pages/index.css'

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__status'); 
const profileForm = document.querySelector('#popup-form-edit');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');
const avatarForm = document.querySelector('#popup-form-update'); 

//Импорт утилитарных функций
import { page, popupItems, openPopup, closePopup } from './utils.js'

//Импорт функциональности модальных окон
import { editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd,
  popupAdd, closeButtonPopupImage, popupUpdate, closeButtonPopupUpdate, updateButton, popupImage } 
from './modal.js'

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

//Обработка карточек
import { cardContainer, titleCard, linkCard, popupImagePicture, popupImageCaption, cardTemplate, initialCards, 
  formCardElement, createCard, prependCard } 
from './card.js';

//Импорт валидации форм
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, enableValidation } 
from './validate.js';

// Включить валидацию форм
enableValidation(); 