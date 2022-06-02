import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__button-submit');
    this._formInputs = Array.from(this._popup.querySelectorAll(".popup__field"))
  }

  _getInputValues() {                            
    return this._formInputs;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading = (isLoading, buttonText = "") => {
    if (isLoading) {
      this._saveButton.textContent = "Сохранение...";
      this._saveButton.disabled = true;
    } else {
        this._saveButton.textContent = buttonText;
        this._saveButton.disabled = false;
    }
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitForm(this._getInputValues());
    });
  };
}
