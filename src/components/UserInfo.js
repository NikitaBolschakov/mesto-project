export default class UserInfo {
  constructor({ nameElement, statusElement, avatarElement }) {
    //принимает селекторы
    this._nameElement = document.querySelector(nameElement);
    this._statusElement = document.querySelector(statusElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    //возвращает объект с данными пользователя
    return {
      name: this._nameElement.textContent,
      status: this._statusElement.textContent,
      avatar: this._avatarElement.style.backgroundImage,
    };
  }

  setUserInfo(data) {
    //принимает новые даннные пользователя и отправляет их на страницу
    this._nameElement.textContent = data.name;
    this._statusElement.textContent = data.about;
    this._avatarElement.style.backgroundImage = `url(${data.avatar})`;
  }
}