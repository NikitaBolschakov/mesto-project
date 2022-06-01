import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__button-submit');

    //this._inputList = this._form.querySelectorAll('.popup__field');
  }

  _getInputValues() {                            
    const formInputs = Array.from(
      this._popup.querySelectorAll(".popup__field")
    );
    return formInputs;
    
    /*
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    */
  }

  /*setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }*/

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading = (isLoading, button) => {
    if (isLoading) {
      button.textContent = "Сохранение...";
      button.disabled = true;
    } else {
      if (button.hasAttribute("button-submit-edit")) {
        button.textContent = "Создать";
      } else {
        button.textContent = "Сохранить";
      }
      button.disabled = false;
    }
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true, this._saveButton);
      this._submitForm(this._getInputValues());
    });
  };
}
