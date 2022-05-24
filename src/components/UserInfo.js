export default class UserInfo {
  constructor({ name, status, avatar }) {
    //принимает три селектора
    this._nameInput = document.querySelector(name);
    this._statusInput = document.querySelector(status);
    this._avatarInput = document.querySelector(avatar);
  }

  getUserInfo() {
    //возвращает объект с данными пользователя
    return {
      name: this._nameInput.textContent,
      status: this._statusInput.textContent,
      avatar: this._avatarInput.style.backgroundImage,
    };
  }

  setUserInfo(data) {
    //принимает новые даннные пользователя и отправляет их на страницу
    this._nameInput.textContent = data.name;
    this._statusInput.textContent = data.about;
    this._avatarInput.style.backgroundImage = `url(${data.avatar})`;

    this._nameInput.value = data.name;
    this._statusInput.value = data.about;
  }
}

/*Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api 
в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.*/
