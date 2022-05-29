export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOvlClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOvlClose);
  }

  _handleEscClose = (evt) => {
    //здесь обязательно стрелочная функция
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOvlClose = (evt) => {
    //и здесь тоже стрелочная
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.target === popupOpened) {
      this.close();
    }
  };

  setEventListeners(buttonClose) {
    buttonClose.addEventListener("click", () => {
      this.close();
    });
  };
}
