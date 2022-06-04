export default class Section {
  constructor({ /*data,*/ renderer }, selector) {
    //this._renderedItems = data;                          <<<< можно удалить
    this._renderer = renderer; 
    this._container = document.querySelector(selector); 
  }

  //принимает DOM элемент, генерирует и добавляет в контейнер
  _addItem(item) {
    const card = this._renderer(item)
    this._container.append(card);
  }

  prependItem(item) {                     // <<<<<<<<< метод для новой карточки
    const card = this._renderer(item)
    this._container.prepend(card);
  }

  //отвечает за отрисовку всех элементов
  renderItems(cards) {                    // (Начало тут) Метод напрямую получает объект, который нужно обработать
    cards.forEach((item) => {
      this._addItem(item);
    });  
  }

   /*//отвечает за отрисовку всех элементов                                <<<<<< так было
   renderItems() {
     this._renderedItems.forEach((item) => this._renderer(item));
   }*/
}
