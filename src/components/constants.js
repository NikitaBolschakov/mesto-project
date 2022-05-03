const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__status");
const profileForm = document.querySelector("#popup-form-edit");
const nameInput = document.querySelector("#field-name");
const jobInput = document.querySelector("#field-job");
const avatarForm = document.querySelector("#popup-form-update");
const cardTemplate = document.querySelector("#card").content;
const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const titleCard = document.querySelector("#field-name-image");
const linkCard = document.querySelector("#field-link-image");
const cardContainer = document.querySelector(".gallery");
const formCardElement = document.querySelector("#popup-form-add");
const editButton = document.querySelector(".profile__button-edit");
const closeButtonPopupEdit = document.querySelector("#close-popup-edit");
const popupEdit = document.querySelector("#popup-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButtonPopupAdd = document.querySelector("#close-popup-add");
const popupAdd = document.querySelector("#popup-add");
const closeButtonPopupImage = document.querySelector("#close-popup-image");
const popupUpdate = document.querySelector("#popup-update");
const closeButtonPopupUpdate = document.querySelector("#close-popup-update");
const updateButton = document.querySelector(".profile__ovl");
const popupImage = document.querySelector("#popup-image");
const editSaveButton = document.querySelector('#button-submit-edit');
const cardSaveButton = document.querySelector("#button-submit-add");
const avatarSaveButton = document.querySelector('#button-avatar-save')
const avatarInput = document.querySelector('#field-avatar');
const avatarElement = document.querySelector('.profile__avatar');

const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
};

export {
  nameElement,
  jobElement,
  profileForm,
  nameInput,
  jobInput,
  avatarForm,
  cardTemplate,
  popupImagePicture,
  popupImageCaption,
  titleCard,
  linkCard,
  cardContainer,
  formCardElement,
  editButton,
  closeButtonPopupEdit,
  popupEdit,
  addButton,
  closeButtonPopupAdd,
  popupAdd,
  closeButtonPopupImage,
  popupUpdate,
  closeButtonPopupUpdate,
  updateButton,
  popupImage,
  editSaveButton,
  cardSaveButton,
  avatarSaveButton,
  avatarInput,
  avatarElement,
  selectors
};