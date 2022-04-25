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