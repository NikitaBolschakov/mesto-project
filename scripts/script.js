//Элементы DOM
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__status');
const formCardElement = document.querySelector('#popup-form-add');              
const cardContainer = document.querySelector('.gallery'); 
const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('#close-popup-edit');
const popupEdit = document.querySelector('#popup-edit');
const addButton = document.querySelector('.profile__button-add');
const closeButtonPopupAdd = document.querySelector('#close-popup-add');
const popupAdd = document.querySelector('#popup-add');
//Кнопка закрытия и попап с изображением
const closeButtonPopupImage = document.querySelector('#close-popup-image');
const popupImage = document.querySelector('#popup-image');
//Редактирование профиля из попапа
const profileForm = document.querySelector('#popup-form-edit');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');
//Поля названия и ссылки на картинку карточки
const titleCard = document.querySelector('#field-name-image');
const linkCard = document.querySelector('#field-link-image');
//Картинка и подпись попапа с изображением
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
//Шаблон карточки
const cardTemplate = document.querySelector('#card').content;


//Функции открытия и закрытия pop-up
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


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


//Функция изменения данных пользователя
function handleProfileFormSubmit(evt) {               
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

/*Кнопка "отправить""-->
выполняется функция handleProfileFormSubmit, 
внутри нее срабатывает ф-ция openClosePopupEdit*/
profileForm.addEventListener('submit', handleProfileFormSubmit);


//Массив карточек из коробки
const initialCards = [
  {
    name: 'Баффинова земля',
    link: 'https://i.pinimg.com/originals/b8/92/02/b892024460f7bac7f7e1ad8bd791cfb5.jpg'
  },
  {
    name: 'Сибирь',
    link: 'https://pbs.twimg.com/media/ELq3CntXYAU1ImZ.jpg'
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
    link: 'https://publicdelivery.org/wp-content/uploads/2019/09/Ragnar-Axelsson-Last-Days-of-the-Arctic-Comet-Hale-Bop-in-the-sky-with-dancing-northern-lights-in-the-village-of-Tinniteqilaaq-on-the-east-coast-of-Greenland-.jpg'
  }
  ];

  
//Функция создания карточки из цикла
function createCard(item) {
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


//Цикл обработки массива карточек из коробки
initialCards.forEach(card => {
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
});


//Функция создания новой карточки 
function prependCard(name, link) {  
  const card = {name, link} 
  const cardElement = createCard(card);
  cardContainer.prepend(cardElement);
}


//Обработчик отправки формы
formCardElement.addEventListener('submit', evt => {                      
  evt.preventDefault();

  //значение полей ввода как аргументы функции 
  prependCard(titleCard.value, linkCard.value);
  
  //чистая форма после добавления карточки 
  evt.target.reset();

  closePopup(popupAdd);
});