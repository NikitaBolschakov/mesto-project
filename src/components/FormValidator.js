export default class FormValidator {
  constructor(selectors, form) {
    this._saveButton = selectors.submitButtonSelector; //это селектор кнопки
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._formElement = selectors.formSelector;
    this._inputElement = selectors.inputSelector;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;

    this._form = form;
    this._saveButtonElement = this._form.querySelector(this._saveButton); //а это DOM элемент кнопки
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputElement)
    ); //массив с инпутами
  }

  //Блокирует кнопку "Сохранить" после отправки формы
  disableSaveButton() {
    this._saveButtonElement.classList.add(this._inactiveButtonClass);
    this._saveButtonElement.setAttribute("disabled", true);
  }

  //Метод добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass); // Добавляем красную полоску
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(this._errorClass); // Показываем сообщение об ошибке
  }

  //Метод удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ""; // Очистим ошибку
  }

  //Метод проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Метод проверяет все поля в форме
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // проходим по этому массиву методом some
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  //Метод блокирует/разблокирует кнопку
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSaveButton();
    } else {
      this._saveButtonElement.classList.remove(this._inactiveButtonClass);
      this._saveButtonElement.removeAttribute("disabled", true);
    }
  }

  // Добавим всем полям заданной формы слушатель
  _setEventListeners() {
    this._toggleButtonState(); // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    this._inputList.forEach((inputElement) => {
      // Обойдём все элементы массива
      inputElement.addEventListener("input", () => {
        // каждому полю добавим обработчик события input
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //Метод очищает ошибки при открытии попапа
  resetValidation() {
    this._toggleButtonState(); //управляем кнопкой
    this._inputList.forEach((inputElement) => {
      //очищаем ошибки
      this._hideInputError(inputElement);
    });
  }

  //Метод включает валидацию
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      // Найдём форму с указанным классом в DOM,
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
