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


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClickOnEscape(popup));
  document.addEventListener('click', handleClickOnOverlay(popup));
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClickOnEscape(popup));
  document.removeEventListener('click', handleClickOnOverlay(popup));
}

const handleClickOnEscape = (popup) => {
  document.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}

const handleClickOnOverlay = (popup) => {
  document.addEventListener('click', evt => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
}


export { editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd,
  popupAdd, closeButtonPopupImage, popupUpdate, closeButtonPopupUpdate, updateButton, popupImage, 
  openPopup, closePopup }