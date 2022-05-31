export default class UserInfo {
  constructor({ nameElement, statusElement, avatarElement, nameField, statusField }) {
    //принимает селекторы
    this._nameElement = document.querySelector(nameElement);
    this._statusElement = document.querySelector(statusElement);
    this._avatarElement = document.querySelector(avatarElement);

    this._nameField = document.querySelector(nameField);
    this._statusField = document.querySelector(statusField);
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
    this._nameField.value = data.name;
    this._statusField.value = data.about;
  }
}

/*Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api 
в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.*/
