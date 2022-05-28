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

  setEventListeners = (buttonClose, buttonSubmit) => {
    super.setEventListeners(buttonClose);
    buttonSubmit.addEventListener("click", (evt) => {
      evt.preventDefault();
      renderLoading(true, avatarSaveButton);
      this._submitForm(this._getInputValues());
    });
  };
}

//Проблема была в том, что setEventListeners в Popup, была стрелочной

/*Видимо он не может наследовать стрелочную функцию. Причем я пробовал стрелочную функцию и без this контекста 
внутри, никакую он не хочет наследовать. В принципе, в консоли он так и пишет -
Cannot read properties of undefined (reading 'call') - Не удается прочитать вызов   */

//super.setEventListeners; - такая строчка вообще не рабочая была и игнорировалась, поэтому ничего не ломалось

