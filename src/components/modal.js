const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleClickOnEscape(popup));
  document.addEventListener("click", handleClickOnOverlay(popup));
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleClickOnEscape(popup));
  document.removeEventListener("click", handleClickOnOverlay(popup));
};

const handleClickOnEscape = (popup) => {
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
};

const handleClickOnOverlay = (popup) => {
  document.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
};

export { openPopup, closePopup };