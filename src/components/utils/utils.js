import { cardSaveButton } from "./constants.js";

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    if (button.hasAttribute("button-submit-edit")) {
      cardSaveButton.textContent = "Создать";
    } else {
      button.textContent = "Сохранить";
    }
    button.disabled = false;
  }
};

export { renderLoading };
