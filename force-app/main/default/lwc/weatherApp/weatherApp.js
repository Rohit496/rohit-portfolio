import { LightningElement } from 'lwc';
import WEATHER_APP_ICONS from '@salesforce/resourceUrl/weatherAppIcons';
import getWeather from '@salesforce/apex/WeatherAppController.getWeather';

// const API_KEY = '08b02af48f7db29a5e2704b2331dcd06';

export default class WeatherApp extends LightningElement {
    clearIcon = WEATHER_APP_ICONS + '/weatherAppIcons/clear.svg';
    cloudIcon = WEATHER_APP_ICONS + '/weatherAppIcons/cloud.svg';
    dropletIcon = WEATHER_APP_ICONS + '/weatherAppIcons/droplet.svg';
    hazeIcon = WEATHER_APP_ICONS + '/weatherAppIcons/haze.svg';
    mapIcon = WEATHER_APP_ICONS + '/weatherAppIcons/map.svg';
    rainIcon = WEATHER_APP_ICONS + '/weatherAppIcons/rain.svg';
    snowIcon = WEATHER_APP_ICONS + '/weatherAppIcons/snow.svg';
    stormIcon = WEATHER_APP_ICONS + '/weatherAppIcons/storm.svg';
    sunIcon = WEATHER_APP_ICONS + '/weatherAppIcons/sun.svg';
    windIcon = WEATHER_APP_ICONS + '/weatherAppIcons/wind.svg';
    thermometerIcon = WEATHER_APP_ICONS + '/weatherAppIcons/thermometer.svg';
    arrowBackIcon = WEATHER_APP_ICONS + '/weatherAppIcons/arrow-back.svg';

    cityName = '';
    loadingText = '';
    isError = false;
    response;
    weatherIcon;

    get loadingClasses() {
        return this.isError ? 'error-msg' : 'success-msg';
    }
    searchHandler(event) {
        // use trim() to remove white spaces
        this.cityName = event.target.value.trim();
    }

    submitHandler(event) {
        event.preventDefault();
        this.fetchData();
    }

    fetchData() {
        this.isError = false;
        this.loadingText = 'Fetching weather details...';
        console.log('cityName', this.cityName);
        //inside this will call our api

        // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`;
        // fetch(URL)
        //     .then((res) => res.json())
        //     .then((result) => {
        //         console.log(JSON.stringify(result));
        //         this.weatherDetails(result);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         this.loadingText = 'Something went wrong';
        //         this.isError = true;
        //     });

        getWeather({ input: this.cityName })
            .then((result) => {
                console.log('result', JSON.stringify(result));
                this.weatherDetails(JSON.parse(result));
            })
            .catch((error) => {
                console.error(error);
                this.loadingText = 'Something went wrong';
                this.isError = true;
            });
    }

    weatherDetails(info) {
        if (info.cod === '404') {
            this.isError = true;
            this.loadingText = `${this.cityName} isn't a valid city name`;
        } else {
            this.loadingText = '';
            this.isError = false;
            const city = info.name;
            const country = info.sys.country;
            const { description, id } = info.weather[0];
            const { temp, feels_like, humidity } = info.main;
            if (id === 800) {
                this.weatherIcon = this.clearIcon;
            } else if ((id >= 200 && id <= 231) || (id >= 600 && id <= 622)) {
                this.weatherIcon = this.stormIcon;
            } else if (id >= 701 && id <= 781) {
                this.weatherIcon = this.hazeIcon;
            } else if (id >= 801 && id <= 804) {
                this.weatherIcon = this.cloudIcon;
            } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                this.weatherIcon = this.rainIcon;
            } else {
                this.weatherIcon = this.sunIcon;
            }

            this.response = {
                ciry: city,
                temperature: Math.floor(temp),
                description: description,
                location: `${city}, ${country}`,
                feels_like: Math.floor(feels_like),
                humidity: `${humidity}%`
            };
            console.log('response', this.response);
            console.log('response', JSON.stringify(this.response));
        }
    }

    backHandler() {
        this.response = null;
        this.cityName = '';
        this.loadingText = '';
        this.isError = false;
        this.weatherIcon = '';
    }
}
