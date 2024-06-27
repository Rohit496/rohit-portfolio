import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import SF_CERTIFICATIONS_FIELD from '@salesforce/schema/Portfolio__c.SalesforceCertifications__c';
import SF_OTHER_CERTIFICATIONS_FIELD from '@salesforce/schema/Portfolio__c.OtherCertifications__c';

const FIELDS = [SF_CERTIFICATIONS_FIELD, SF_OTHER_CERTIFICATIONS_FIELD];

import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioCertifications extends LightningElement {
    certLogo = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`;
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    certification({ error, data }) {
        if (data) {
            console.log('DATA', data);
            this.formateData(data);
        } else if (error) {
            console.error('Error', error);
        }
    }

    sfCertiList = [];
    otherCertiList = [];
    formateData(data) {
        const { SalesforceCertifications__c, OtherCertifications__c } =
            data.fields;
        this.sfCertiList = SalesforceCertifications__c
            ? SalesforceCertifications__c.value.split(';').map((item) => {
                  return `${item}`;
              })
            : [];
        this.otherCertiList = OtherCertifications__c
            ? OtherCertifications__c.value.split(';')
            : [];
    }
}
