import Popup from "./Popup";
import { renderLoading } from "./utils.js";
import { avatarSaveButton } from "./constants.js";

export default class PopupWithForm extends Popup {
  constructor(popup, submitForm, form) {
    super(popup);
    this._submitForm = submitForm;
    this._form = form;
  }

  _getInputValues() {
    //собирает значение полей формы
    const formInputs = Array.from(
      this._popup.querySelectorAll(".popup__field")
    );
    return formInputs;
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }

  setEventListeners = (buttonClose, form) => {
    super.setEventListeners(buttonClose);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      renderLoading(true, avatarSaveButton);
      this._submitForm(this._getInputValues());
    });
  };
}
