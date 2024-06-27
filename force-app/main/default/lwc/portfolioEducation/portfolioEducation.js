import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const COLUMNS = [
    { label: 'Education', fieldName: 'Title' },
    { label: 'Institution', fieldName: 'Institution' },
    { label: 'Year', fieldName: 'Year' }
];

export default class PortfolioEducation extends LightningElement {
    columns = COLUMNS;
    @api recordId;
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Educations__r',
        fields: [
            'Education__c.Name',
            'Education__c.InstitutionName__c',
            'Education__c.PassingYear__c',
            'Education__c.Title__c'
        ],
        sortBy: ['Education__c.PassingYear__c']
    })
    education({ error, data }) {
        if (data) {
            // console.log('my data', JSON.stringify(data));
            this.formatData(data);
        } else if (error) {
            console.error('Error', error);
        }
    }

    tableData = [];
    formatData(data) {
        this.tableData = [...data.records].reverse().map((record) => {
            let id = record.id;
            const { InstitutionName__c, PassingYear__c, Title__c } =
                record.fields;
            let Education = Title__c.value;
            let Institution = InstitutionName__c.value;
            let Year = PassingYear__c.value;
            let Title = Title__c.value;

            return { id, Education, Institution, Year, Title };
        });
        console.log('tableData', JSON.stringify(this.tableData));
    }
}
