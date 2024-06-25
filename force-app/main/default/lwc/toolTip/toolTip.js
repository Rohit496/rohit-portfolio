import { LightningElement, api, track } from 'lwc';

export default class ToolTip extends LightningElement {
    @api tooltipText = 'Default tooltip text';
    @track isTooltipVisible = false;

    showTooltip() {
        this.isTooltipVisible = true;
    }

    hideTooltip() {
        this.isTooltipVisible = false;
    }
}
