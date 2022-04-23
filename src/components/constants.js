//Для индекс
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__status'); 
const profileForm = document.querySelector('#popup-form-edit');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');
const avatarForm = document.querySelector('#popup-form-update'); 
//Для кард
const cardTemplate = document.querySelector('#card').content;
const popupImagePicture = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
const titleCard = document.querySelector('#field-name-image');
const linkCard = document.querySelector('#field-link-image');
const cardContainer = document.querySelector('.gallery'); 
const formCardElement = document.querySelector('#popup-form-add');  
//Для модал
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
//для утилс
const page = document.querySelector('.page');
const popupItems = document.querySelectorAll('.popup');

export { nameElement, jobElement, profileForm, nameInput, jobInput, avatarForm, 
    cardTemplate, popupImagePicture, popupImageCaption, titleCard, linkCard, cardContainer, formCardElement,
    editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd, popupAdd, closeButtonPopupImage, 
    popupUpdate, closeButtonPopupUpdate, updateButton, popupImage,
    page, popupItems }