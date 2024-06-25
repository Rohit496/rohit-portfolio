import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConvertorApp extends LightningElement {
    currencyImage =
        currencyConverterAssets + '/currencyConverterAssets/currency.svg';

    countryList = countryCodeList;

    countryFrom = 'MYR';
    countryTo = 'INR';
    amount = '';
    result;
    error;

    handleChange(event) {
        const { name, value } = event.target;
        console.log('name', name);
        console.log('value', value);
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    handleAmountChange(event) {
        this.amount = event.target.value; // Update amount based on user input
    }

    submitHandler(event) {
        event.preventDefault();
        this.convert();
    }

    async convert() {
        const API_KEY = '6626b7a5c9c952c0aa6378d0';
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`;
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            console.log('jsonData', jsonData);
            if (jsonData.result === 'success') {
                this.result = (
                    Number(this.amount) * jsonData.conversion_rate
                ).toFixed(2);
                console.log('result', this.result);
            } else {
                this.error = 'Failed to fetch conversion rate.';
                console.log(this.error);
            }
        } catch (error) {
            console.log(error);
            this.error = 'An error occurred. Please try again...';
        }
    }
}
