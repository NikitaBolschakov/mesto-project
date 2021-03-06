import { selectors } from "./constants.js";

//Отключение кнопки Сохранить после отправки формы
const disableSaveButton = (saveButton) => {
  saveButton.classList.add(selectors.inactiveButtonClass);
  saveButton.setAttribute("disabled", true);
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //подпись ошибки

  // Добавляем красную полоску
  inputElement.classList.add(selectors.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add(selectors.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, selectors) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectors.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(selectors.errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selectors
    );
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, selectors);
  }
};

//Функция, которая проверяет все поля в форме
// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

//Функция, которая блокирует/разблокирует кнопку
// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, selectors) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(selectors.inactiveButtonClass);
    // отключи ее
    buttonElement.setAttribute("disabled", true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", true);
  }
};

// Добавим всем полям заданной формы слушатель
const setEventListeners = (formElement, selectors) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector
  );

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, selectors);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

//Функция, которая включает валидацию
const enableValidation = (selectors) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, selectors);
  });
};

export {
  disableSaveButton,
  showInputError,
  hideInputError,
  isValid,
  hasInvalidInput,
  toggleButtonState,
  enableValidation,
};