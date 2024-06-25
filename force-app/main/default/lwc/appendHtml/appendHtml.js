import { LightningElement, api } from 'lwc';

export default class AppendHtml extends LightningElement {
    _result;
    loaded = false;
    @api
    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
        if (this._result && this.loaded) {
            this.attachHtml();
        }
    }
    renderedCallback() {
        if (this._result && !this.loaded) {
            this.attachHtml();
        }
    }

    attachHtml() {
        this.template.querySelector('.htmlcontainer').innerHTML = this._result;
        this.loaded = true;
    }
}
