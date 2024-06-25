import { LightningElement, api } from 'lwc';

export default class ClockDropDown extends LightningElement {
    @api label = '';
    @api options = [];
    @api uniqueId = '';

    changeHandler(event) {
        // console.log(event.target.value);
        // console.log(this.label);
        this.callParentMethod(event.target.value);
    }

    callParentMethod(value) {
        this.dispatchEvent(
            new CustomEvent('optionhandler', {
                detail: {
                    label: this.label,
                    value: value
                }
            })
        );
        // console.log('Event dispatched', this.label, value);
    }

    @api reset(value) {
        this.template.querySelector('select').value = value;
        this.callParentMethod(value);
    }
}
