import { LightningElement, api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api objectApiName;
    @api recordId;
    @api resumeUrl;

    handleDownloadResume() {
        window.open(this.resumeUrl, '_blank');
    }
}

//    'https://github.com/Rohit496/rohit-resume/raw/main/SFdummyResume%20(1).pdf'
