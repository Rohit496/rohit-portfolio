import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import AWARDS_FIELD from '@salesforce/schema/Portfolio__c.Awards__c';
import LAMGUAGE_FIELD from '@salesforce/schema/Portfolio__c.Languages__c';
import SUPERBADGES_FIELD from '@salesforce/schema/Portfolio__c.Superbadges__c';

import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

const FIELDS = [AWARDS_FIELD, LAMGUAGE_FIELD, SUPERBADGES_FIELD];

export default class PortfolioOtherDetails extends LightningElement {
    superBadges = [];
    awards = [];
    languages = [];

    awardIcon = `${PortfolioAssets}/PortfolioAssets/trophy.png`;
    languageIcon = `${PortfolioAssets}/PortfolioAssets/language.png`;
    superBadgeIcon = `${PortfolioAssets}/PortfolioAssets/badge.png`;
    @api recordId;
    @wire(getRecord, {
        recordId: '$recordId',
        fields: FIELDS
    })
    otherDetails({ error, data }) {
        if (data) {
            console.log('data', data);
            this.formatData(data);
        } else if (error) {
            console.log(error);
        }
    }

    formatData(data) {
        const { Awards__c, Languages__c, Superbadges__c } = data.fields;
        this.awards =
            Awards__c && Awards__c.value ? Awards__c.value.split(',') : [];
        this.languages = Languages__c.value
            ? Languages__c.value.split(',')
            : [];
        this.superBadges = Superbadges__c.value
            ? Superbadges__c.value.split(';')
            : [];
        console.log('this.awards', JSON.stringify(this.awards));
    }
}
