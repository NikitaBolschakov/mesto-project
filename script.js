//Открыть-закрыть pop-up "Редактирование профиля"
const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('#close-popup-edit');
const popupEdit = document.querySelector('#popup-edit');

function openClosePopupEdit() {
  popupEdit.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openClosePopupEdit);
closeButtonPopupEdit.addEventListener('click', openClosePopupEdit);

//closeButtonPopupEdit.addEventListener('click', function() {}




//Открыть-закрыть pop-up "Добавить карточку"
const addButton = document.querySelector('.profile__button-add');
const closeButtonPopupAdd = document.querySelector('#close-popup-add');
const popupAdd = document.querySelector('#popup-add');

function openClosePopupAdd() {
  popupAdd.classList.toggle('popup_opened');
}

addButton.addEventListener('click', openClosePopupAdd);
closeButtonPopupAdd.addEventListener('click', openClosePopupAdd);




//Открыть-закрыть pop-up "Увеличить картинку"
const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

const closeButtonPopupImage = document.querySelector('#close-popup-image');
const popupImage = document.querySelector('#popup-image');

function openClosePopupImage() {
  popupImage.classList.toggle('popup_opened');
}

cardElement.querySelector('.element__image').addEventListener('click', openClosePopupImage);
closeButtonPopupImage.addEventListener('click', openClosePopupImage);









//Редактирование профиля из попапа
const formElement = document.querySelector('#popup-form-edit');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');

//Функция изменения данных пользователя
function formSubmitHandler(evt) {               
    evt.preventDefault();
                       
    //Нашёл значения полей
    let nameValue = nameInput.value;    
    let jobValue = jobInput.value;
    
    //Нашел элементы куда буду вставлять значения полей
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__status');

    //Вставил новые значения
    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

    //Вместо отправки на сервер, просто закрываю форму
    openClosePopupEdit();
}

/*Кнопка "отправить""-->
выполняется функция formSubmitHandler, 
внутри нее срабатывает ф-ция openClosePopupEdit*/
formElement.addEventListener('submit', formSubmitHandler);










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










//Добавление карточек
const formCardElement = document.querySelector('#popup-form-add');              
const cardContainer = document.querySelector('.gallery'); 

//Цикл обработки массива карточек из коробки
initialCards.forEach(function (card) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__image').alt = card.name;

  //открытие попапа с изображением
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupImage.querySelector('.popup__image').setAttribute('src', card.link);
    popupImage.querySelector('.popup__image').setAttribute('alt', card.name);
    popupImage.querySelector('.popup__caption').textContent = card.name;
    
    openClosePopupImage();
  });

  //лайк
  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  //удаление
  const deleteButton = cardElement.querySelector('.element__button-delete');  
  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  //добавление в DOM
  cardContainer.prepend(cardElement);
});










//Функция создания/удаления/лайка карточки 
function newCard(name, link) {                                         
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  //контент и свойства карточки
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;

  //открытие попапа с изображением
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupImage.querySelector('.popup__image').setAttribute('src', link);
    popupImage.querySelector('.popup__image').setAttribute('alt', name);
    popupImage.querySelector('.popup__caption').textContent = name;
    
    openClosePopupImage();
  });

  //лайк
  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  
  //удаление
  const deleteButton = cardElement.querySelector('.element__button-delete');  
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  //добавление в начало DOM
  cardContainer.prepend(cardElement);
}











//Обработчик отправки формы
formCardElement.addEventListener('submit', function(evt) {                      
  evt.preventDefault();

  const titleCard = document.querySelector('#field-name-image');
  const linkCard = document.querySelector('#field-link-image');

  //значение полей ввода как аргументы функции
  newCard(titleCard.value, linkCard.value);

  //чистые поля ввода после добавления карточки 
  titleCard.value = '';                                                         
  linkCard.value = '';

  openClosePopupAdd();
});

