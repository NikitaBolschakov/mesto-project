/*
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleClickOnEscape);
  document.addEventListener("click", handleClickOnOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleClickOnEscape);
  document.removeEventListener("click", handleClickOnOverlay);
};

const handleClickOnEscape = (evt) => {
  if (evt.key === "Escape") {
    //нахожу открытый в данный момент попап
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const handleClickOnOverlay = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};

export { openPopup, closePopup };
*/
class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  openPopup(popup) {
    popup.classList.add("popup_opened");
    this._selector.addEventListener("keydown", this._handleClickOnEscape);
  }

  closePopup(popup) {
    popup.classList.remove("popup_opened");
    this._selector.removeEventListener("keydown", this._handleClickOnEscape);
    this._selector.removeEventListener("click", this._handleClickOnOverlay);
  }

  _handleClickOnEscape(evt) {
    if (evt.key === "Escape") {
      //нахожу открытый в данный момент попап
      const popupOpened = document.querySelector(".popup_opened");
      this.closePopup(popupOpened);
    }
  }

  _handleClickOnOverlay(evt) {
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.target === popupOpened) {
      this.closePopup(popupOpened);
    }
  }

  setEventListeners(btn) {
    btn.addEventListener("click", function () {
      this.closePopup(this._selector);
    });
    this._selector.addEventListener("click", this._handleClickOnOverlay);
  }
}

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

openPopup(popup) {
  popup.setAttribute('src', //this._link);
  popup.setAttribute('alt', //this._name);
  popup.textContent = //this._name;
  super.openPopup(popup);

}

}