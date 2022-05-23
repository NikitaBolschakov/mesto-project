export default class Section {
    constructor ({data, renderer}, selector) {  //принимает объект и колбек-инструкцию, + селектор контейнера
        this._renderedItems = data;             //массив карточек
        this._container = document.querySelector(selector);  //контейнер, в котором все отрисуем
        this._renderer = renderer;                           //инструкция в index.js
    }

    setItem(item) {                        
        const card = this._renderer(item); //(3) каждый элемент объекта проходит инструкцию renderer
        this._container.append(card);      //(5) и добавляется в контейнер
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this.setItem(item)               //(2) пройтись по каждому элементу объекта и для каждого запустить setItem
        });
    }
}