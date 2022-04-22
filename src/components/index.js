//Элементы DOM
const page = document.querySelector('.page');
const popupItems = document.querySelectorAll('.popup');
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
//Попап обновить аватар
const popupUpdate = document.querySelector('#popup-update');
const closeButtonPopupUpdate = document.querySelector('#close-popup-update');
const updateButton = document.querySelector('.profile__ovl');
const avatarElement = document.querySelector('.profile__avatar');
const avatarForm = document.querySelector('#popup-form-update'); //форма
const avatarInput = document.querySelector('#field-avatar'); //поле формы
const formError = avatarForm.querySelector(`.${avatarInput.id}-error`); //сообщение об ошибке


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

const handleUpdateFormSubmit = (evt) => {
  evt.preventDefault();

  const avatarValue = avatarInput.value;
  avatarElement.style.backgroundImage = "url('${avatarValue}')";

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


//Цикл обработки массива карточек из коробки
initialCards.forEach(card => {
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





// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //подпись ошибки

  // Добавляем красную полоску
  inputElement.classList.add('popup__field_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__field-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__field_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__field-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
}; 

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button-submit_inactive');
    // отключи ее
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-submit_inactive');
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}; 


// Добавим всем полям заданной формы слушатель
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__button-submit');

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(); 
