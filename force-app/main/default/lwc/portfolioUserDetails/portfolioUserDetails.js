import { LightningElement, api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api objectApiName;
    @api recordId;

    handleDownloadResume() {
        window.open(
            'https://github.com/Rohit496/rohit-resume/raw/main/SFdummyResume%20(1).pdf',
            '_blank'
        );
    }
}
