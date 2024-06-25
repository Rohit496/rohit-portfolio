import { LightningElement, api } from 'lwc';

export default class Notification extends LightningElement {
    message;
    variant;
    isShowNotification = false;
    @api showToast(message, variant) {
        this.message = message || 'Please give the message';
        this.variant = variant || 'success';
        this.isShowNotification = true;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.isShowNotification = false;
        }, 3000);
    }

    get notifyClasses() {
        let variantClass =
            this.variant === 'success'
                ? 'slds-theme_success'
                : this.variant === 'warning'
                  ? 'slds-theme_warning'
                  : this.variant === 'error'
                    ? 'slds-theme_error'
                    : 'slds-theme_info';
        return `slds-notify slds-notify_toast ${variantClass}`;
    }
}
