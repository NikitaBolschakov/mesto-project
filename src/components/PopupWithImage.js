import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._caption = this._popup.querySelector('.popup__caption');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(name, link) {
    this._image.src = link;   // сокращенно от this._image.setAttribute('src', link);
    this._image.alt = name;   
    this._caption.textContent = name;

    super.open(); //открывает попап и вешает слушатели на esc и overlay
  }
}
