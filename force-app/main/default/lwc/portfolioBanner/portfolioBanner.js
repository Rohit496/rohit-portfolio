import { LightningElement, wire, api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FULL_NAME from '@salesforce/schema/Portfolio__c.FullName__c';
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c';
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c';
import DESIGNATION from '@salesforce/schema/Portfolio__c.Designation__c';

export default class PortfolioBanner extends LightningElement {
    @api recordId; //= 'a01dL00000F2b2rQAB';
    @api linkedinUrl; // = 'https://www.linkedin.com/in/rohit-kumar-81916b190';
    @api youtubeUrl; // = 'https://www.youtube.com/@salesforcehunt';
    @api githubUrl; // = 'https://github.com/Rohit496';
    @api twitterUrl; // = 'https://x.com/RohitGu83309245';
    @api trailheadUrl; // = 'https://www.salesforce.com/trailblazer/cloudyrohit';
    @api bloggerUrl; // = 'https://salesforcehunt.blogspot.com';

    userPic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`;
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
    twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;
    blogger = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [FULL_NAME, COMPANY_LOCATION, COMPANY_NAME, DESIGNATION]
    })
    portfolioData;
    // portfolioHandler({ error, data }) {
    //     if (data) {
    //         console.log('data', data);
    //         this.fullName = data.fields.FullName__c.value;
    //         this.companyLocation = data.fields.CompanyLocation__c.value;
    //         this.companyName = data.fields.CompanyName__c.value;
    //         this.designation = data.fields.Designation__c.value;
    //     } else if (error) {
    //         console.error(error);
    //     }
    // }

    get fullName() {
        return getFieldValue(this.portfolioData.data, FULL_NAME);
    }

    get companyLocation() {
        return getFieldValue(this.portfolioData.data, COMPANY_LOCATION);
    }

    get companyName() {
        return getFieldValue(this.portfolioData.data, COMPANY_NAME);
    }

    get designation() {
        return getFieldValue(this.portfolioData.data, DESIGNATION);
    }
}
