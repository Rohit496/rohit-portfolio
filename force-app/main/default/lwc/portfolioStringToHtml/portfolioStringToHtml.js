import { LightningElement, api } from 'lwc';

export default class PortfolioStringToHtml extends LightningElement {
    @api content;

    isLoaded = false;
    renderedCallback() {
        if (!this.isLoaded) {
            this.isLoaded = true;
            this.template.querySelector('.htmlContainer').innerHTML =
                this.content;
        }
    }
}
