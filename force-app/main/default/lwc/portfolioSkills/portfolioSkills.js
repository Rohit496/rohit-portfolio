import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILLS_FIELD from '@salesforce/schema/Portfolio__c.TechnicalSkills__c';
import SOFT_SKILLS_FIELD from '@salesforce/schema/Portfolio__c.SoftSkills__c';
import SOFTWARE_FIELD from '@salesforce/schema/Portfolio__c.SoftwareTools__c';
import METHOLOGY_FIELD from '@salesforce/schema/Portfolio__c.SoftwareDevelopmentMethodologies__c';

const FIELDS = [
    TECH_SKILLS_FIELD,
    SOFT_SKILLS_FIELD,
    SOFTWARE_FIELD,
    METHOLOGY_FIELD
];

export default class PortfolioSkills extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact({ error, data }) {
        if (('DATA', data)) {
            console.log(data);
            this.formatSkills(data);
        } else if (error) {
            console.log(error);
        }
    }

    techSkills = [];
    softSkills = [];
    softwareTools = [];
    methodologies = [];
    formatSkills(data) {
        const {
            SoftSkills__c,
            SoftwareDevelopmentMethodologies__c,
            SoftwareTools__c,
            TechnicalSkills__c
        } = data.fields;
        this.techSkills = TechnicalSkills__c
            ? TechnicalSkills__c.value.split(',')
            : [];
        this.softSkills = SoftSkills__c ? SoftSkills__c.value.split(',') : [];
        this.softwareTools = SoftwareTools__c
            ? SoftwareTools__c.value.split(',')
            : [];
        this.methodologies = SoftwareDevelopmentMethodologies__c
            ? SoftwareDevelopmentMethodologies__c.value.split(',')
            : [];
    }
}
