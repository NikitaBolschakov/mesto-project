const page = document.querySelector('.page');
const popupItems = document.querySelectorAll('.popup');

//Функция открытия pop-up
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  //Добавляю слушатель события 'Escape'
  popupItems.forEach(popupItem => page.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
      closePopup(popupItem);
    }
  }))
  //Закрытие кликом на оверлей
  popupItems.forEach(popupItem => popupItem.addEventListener('click', evt => {
    if (evt.target === popupItem) {
     closePopup(popupItem);
    }
  }))
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

export { page, popupItems, openPopup, closePopup }