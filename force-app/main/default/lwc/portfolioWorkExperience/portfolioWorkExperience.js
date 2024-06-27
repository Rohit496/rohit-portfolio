import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class PortfolioWorkExperience extends LightningElement {
    @api recordId;
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'WorkExperience__r',
        fields: [
            'Work_Experience__c.JobStartDate__c',
            'Work_Experience__c.JobEndDate__c',
            'Work_Experience__c.Role__c',
            'Work_Experience__c.CompanyName__c',
            'Work_Experience__c.Description__c',
            'Work_Experience__c.WorkLocation__c',
            'Work_Experience__c.IsCurrent__c'
        ]
    })
    workExperience({ error, data }) {
        if (data) {
            console.log('my data', JSON.stringify(data));
            this.formatExperience(data);
        } else if (error) {
            console.error(error);
        }
    }

    workExperienceList = [];
    formatExperience(data) {
        this.workExperienceList = [...data.records].reverse().map((item) => {
            let id = item.id;
            const {
                JobStartDate__c,
                JobEndDate__c,
                Role__c,
                CompanyName__c,
                Description__c,
                WorkLocation__c,
                IsCurrent__c
            } = item.fields;

            let jobStartDate = this.getValue(JobStartDate__c);
            let jobEndDate = this.getValue(JobEndDate__c);
            let role = this.getValue(Role__c);
            let companyName = this.getValue(CompanyName__c);
            let description = this.getValue(Description__c);
            let workLocation = this.getValue(WorkLocation__c);
            let isCurrent = this.getValue(IsCurrent__c);

            return {
                id,
                jobStartDate,
                jobEndDate,
                role,
                companyName,
                description,
                workLocation,
                isCurrent
            };
        });

        console.log(
            'workExperienceList',
            JSON.stringify(this.workExperienceList)
        );
    }

    getValue(data) {
        return data && (data.displayValue || data.value);
    }
}
