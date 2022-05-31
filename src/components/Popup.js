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
    if (evt.target === this._popup) {
      this.close();
    }
  };

  setEventListeners() {
    const buttonClose = this._popup.querySelector('.popup__button-close');
    buttonClose.addEventListener("click", () => {
      this.close();
    });
  }
}
