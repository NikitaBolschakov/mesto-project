import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popup, handleSubmitForm, form) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;
        this._form = form;
    }

    _getInputValues() { //собирает значение полей формы
        
        
        return this._inputValues
    }

    setEventListeners(buttonClose) {
        super(buttonClose);
        this._form.addEventListener('submit', () => {
            this._handleSubmitForm(/*полученные данные полей*/);
        })
    }
    

    close() {
        super.close();
        this._form.reset(); //очистить форму
    }
}

