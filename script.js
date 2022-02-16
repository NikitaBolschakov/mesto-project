//Открыть-закрыть pop-up "Редактирование профиля"
const editButton = document.querySelector('.profile__button-edit');
const closeButtonPopupEdit = document.querySelector('#close-popup-edit');
const popupEdit = document.querySelector('#popup-edit');

function openClosePopupEdit() {
    popupEdit.classList.toggle('popup_opened');
}

editButton.addEventListener('click', openClosePopupEdit);
closeButtonPopupEdit.addEventListener('click', openClosePopupEdit);




//Открыть-закрыть pop-up "Добавить карточку"
const addButton = document.querySelector('.profile__button-add');
const closeButtonPopupAdd = document.querySelector('#close-popup-add');
const popupAdd = document.querySelector('#popup-add');

function openClosePopupAdd() {
    popupAdd.classList.toggle('popup_opened');
}

addButton.addEventListener('click', openClosePopupAdd);
closeButtonPopupAdd.addEventListener('click', openClosePopupAdd);




/*Редактирование профиля из попапа*/
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#field-name');
const jobInput = document.querySelector('#field-job');

/*Функция изменения данных пользователя*/
function formSubmitHandler(evt) {               
    evt.preventDefault();
                       
    /*Нашёл значения полей*/
    let nameValue = nameInput.value;    
    let jobValue = jobInput.value;
    
    /*Нашел элементы куда буду вставлять значения полей*/
    const nameElement = document.querySelector('.profile__name');
    const jobElement = document.querySelector('.profile__status');

    /*Вставил новые значения*/
    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

    /*Вместо отправки на сервер, просто закрываю форму*/
    openClosePopupEdit();
}

/*Кнопка "отправить""-->
выполняется функция formSubmitHandler, 
внутри нее срабатывает ф-ция openClosePopupEdit*/
formElement.addEventListener('submit', formSubmitHandler);




//Шесть карточек из коробки
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];




//Лайк
const buttonLike = document.querySelector('.element__button-like');

buttonLike.addEventListener('click', function (evt) {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули

    const eventTarget = evt.target;
    eventTarget.setAttribute('style', 'background-image: url(../../../images/button-like-active.svg)');
}); 
//попробовать когда карточки будут через тemplate