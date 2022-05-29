export default class Section {
  constructor({ data, renderer }, selector) {
    //принимает объект и колбек-инструкцию, + селектор контейнера
    this._renderedItems = data; //массив карточек
    this._renderer = renderer; //инструкция в index.js, отвечает за отрисовку отдельного элемента
    this._container = document.querySelector(selector); //контейнер, в котором все отрисуем
  }

  //отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  //принимает DOM элемент и добавляет его в контейнер
  addItem(item) {
    this._container.append(item);
  }
}
