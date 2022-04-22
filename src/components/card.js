const cardTemplate = document.querySelector('#card').content;
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const titleCard = document.querySelector('#field-name-image');
const linkCard = document.querySelector('#field-link-image');
const cardContainer = document.querySelector('.gallery'); 
const formCardElement = document.querySelector('#popup-form-add');  

//Импорт утилитарных функций
import { page, popupItems, openPopup, closePopup } from './utils.js'

//Массив карточек из коробки
const initialCards = [
  {
    name: 'Баффинова земля',
    link: 'https://i.pinimg.com/originals/b8/92/02/b892024460f7bac7f7e1ad8bd791cfb5.jpg'
  },
  {
    name: 'Сибирь',
    link: 'https://cameralabs.org/aeonmedia/zenfoto/4680/26718/geroi-arktiki-fotograf-ragnar-akselsson-3_original.jpg'
  },
  {
    name: 'Якутия',
    link: 'https://media.newyorker.com/photos/61c4b326e75264a7841ec846/master/pass/Taub-Ragnar-18.jpg'
  },
  {
    name: 'Фарерские острова',
    link: 'https://novation-nn.ru/wp-content/uploads/2018/03/vystavka-islandskogo-fotografa-ragnara-akselssona.jpg'
  },
  {
    name: 'Исландия',
    link: 'https://img-fotki.yandex.ru/get/6408/20682809.284/0_90f5d_5719da04_XL.jpg'
  },
  {
    name: 'Гренландия',
    link: 'https://cameralabs.org/aeonmedia/zenfoto/4680/27058/za-gorami-fotograf-ragnar-akselsson-1_original.jpg'
  }
];

//Импорт функциональности модальных окон
import { editButton, closeButtonPopupEdit, popupEdit, addButton, closeButtonPopupAdd,
    popupAdd, closeButtonPopupImage, popupUpdate, closeButtonPopupUpdate, updateButton, popupImage } 
from './modal.js';


//Функция создания карточки из цикла
const createCard = (item) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  
  const titleCardElement = cardElement.querySelector('.element__title');
  const imageCardElement = cardElement.querySelector('.element__image');

  titleCardElement.textContent = item.name;
  imageCardElement.src = item.link;
  imageCardElement.alt = item.name;

  //открытие попапа с изображением
  imageCardElement.addEventListener('click', () => {
    popupImagePicture.setAttribute('src', item.link);
    popupImagePicture.setAttribute('alt', item.name);
    popupImageCaption.textContent = item.name;
    
    openPopup(popupImage);
  });

  //лайк
  cardElement.querySelector('.element__button-like').addEventListener('click', evt => {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  //удаление
  const deleteButton = cardElement.querySelector('.element__button-delete');  
  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
}

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

export { cardContainer, titleCard, linkCard, popupImagePicture, popupImageCaption, cardTemplate, 
    initialCards, formCardElement, createCard, prependCard };