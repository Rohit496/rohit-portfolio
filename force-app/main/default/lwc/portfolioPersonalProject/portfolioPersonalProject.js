import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioPersonalProject extends LightningElement {
    BMICaculator = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`;
    AlarmClock = `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`;
    CurrencyCalculator = `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`;
    WeatherApp = `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`;
    NoteApp = `${PortfolioAssets}/PortfolioAssets/Projects/NoteTakingApp.png`;

    projects = [
        {
            name: 'BMI Calculator App',
            description:
                'A simple BMI calculator that allows users to input their weight and height to calculate their BMI.',
            image: this.BMICaculator,
            link: `https://rohit-portfolio-dev-ed.develop.my.site.com/bmi-calculator`
        },
        {
            name: 'Alarm Clock App',
            description:
                'An alarm clock app that allows users to set an alarm and wake up to their favorite music.',
            image: this.AlarmClock,
            link: `https://rohit-portfolio-dev-ed.develop.my.site.com/alarm-clock`
        },
        {
            name: 'Currency Calculator App',
            description:
                'A currency calculator that allows users to convert currencies from around the world.',
            image: this.CurrencyCalculator,
            link: `https://rohit-portfolio-dev-ed.develop.my.site.com/currency-convertor`
        },
        {
            name: 'Weather App',
            description:
                'A weather app that allows users to check the weather in their location and other locations around the world.',
            image: this.WeatherApp,
            link: `https://rohit-portfolio-dev-ed.develop.my.site.com/weather-app`
        },

        {
            name: 'Note App',
            description:
                'A note app that allows users to create and save notes on various topics.',
            image: this.NoteApp,
            link: `https://rohit-portfolio-dev-ed.develop.my.site.com/note-taking-app`
        }
    ];
}
