export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //принимает DOM элемент, генерирует и добавляет в контейнер
  _addItem(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }
  //отрисовка карточки
  prependItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  //отвечает за отрисовку всех элементов
  renderItems(cards) {
    cards.forEach((item) => {
      this._addItem(item);
    });
  }
}
