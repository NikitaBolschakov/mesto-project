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
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

const handleClickOnOverlay = (evt) => {
  const popupOpened = document.querySelector(".popup_opened");
  if (evt.target === popupOpened) {
    closePopup(popupOpened);
  }
};

export { openPopup, closePopup };
*/
export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  openPopup(popup) {
    popup.classList.add("popup_opened");
    this._selector.addEventListener("click", this._handleClickOnOverlay);
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
    btn.addEventListener("click", this.closePopup.bind(this, this._selector));
  }
}

//-------------------------------------------------------------------------------
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

  _handleEscClose = (evt) => {   //здесь обязательно стрелочная функция
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOvlClose = (evt) => {   //и здесь тоже
    const popupOpened = document.querySelector(".popup_opened");
    if (evt.target === popupOpened) {
      this.close();
    }
  };

  setEventListeners = (buttonClose) => {
    buttonClose.addEventListener("click", () => {
      this.close();
    });
  };
}
/*
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
*/


const popupAddCard = new Popup(popupAdd); 
//Открыть pop-up "Добавить карточку"
addButton.addEventListener("click", () => {
  //openPopup(popupAdd);
  popupAddCard.open();
});

popupAddCard.setEventListeners(closeButtonPopupAdd);
/*//Закрыть pop-up "Добавить карточку"
closeButtonPopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});*/