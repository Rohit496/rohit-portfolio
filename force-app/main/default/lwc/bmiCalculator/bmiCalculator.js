import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = '';
    weight = '';
    bmiValue = '';
    result = '';

    handleChange(event) {
        const { name, value } = event.target;
        if (name === 'height') {
            this.height = value;
        }
        if (name === 'weight') {
            this.weight = value;
        }
    }

    submitHandler(event) {
        event.preventDefault();
        console.log('Height: ' + this.height);
        console.log('Weight: ' + this.weight);
        this.calculateBMI();
    }

    calculateBMI() {
        let height = Number(this.height) / 100;
        let weight = Number(this.weight);

        if (height > 0 && weight > 0) {
            let bmi = weight / (height * height);
            this.bmiValue = Number(bmi.toFixed(2));
            if (this.bmiValue < 18.5) {
                this.result = 'Underweight';
            } else if (this.bmiValue >= 18.5 && this.bmiValue < 25) {
                this.result = 'Healthy';
            } else if (this.bmiValue >= 25 && this.bmiValue < 30) {
                this.result = 'Overweight';
            } else {
                this.result = 'Obese';
            }
        } else {
            this.bmiValue = 'Invalid input';
            this.result = 'Height and weight must be greater than zero';
        }

        console.log('BMI: ' + this.bmiValue);
        console.log('Result: ' + this.result);
    }

    recalculateHandler() {
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
        this.result = '';
    }
}
