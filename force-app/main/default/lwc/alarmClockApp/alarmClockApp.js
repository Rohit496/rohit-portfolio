import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';
    ringtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3');

    currentTime = '';
    alarmSetMessage = '';

    connectedCallback() {
        this.createHourOptions();
        this.createMinuteOptions();
        this.currentTimeHandler();
    }

    currentTimeHandler() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setInterval(() => {
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = 'AM';

            if (hour === 0) {
                hour = 12;
                ampm = 'AM';
            } else if (hour === 12) {
                ampm = 'PM';
            } else if (hour >= 12) {
                hour = hour - 12;
                ampm = 'PM';
            }

            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            this.currentTime = `${hour}:${min}:${sec} ${ampm}`;

            if (
                this.alarmTime === `${hour}:${min} ${ampm}` &&
                this.isAlarmSet &&
                !this.isAlarmTriggered
            ) {
                console.log('Alarm Triggered!!');
                this.isAlarmTriggered = true;
                this.ringtone.play();
                this.ringtone.loop = true;
            }
        }, 1000);
    }

    hours = [];
    createHourOptions() {
        for (let i = 1; i <= 12; i++) {
            let val = i < 10 ? '0' + i : i;
            this.hours.push(val);
        }
    }

    minutes = [];
    createMinuteOptions() {
        for (let i = 0; i <= 59; i++) {
            let val = i < 10 ? '0' + i : i;
            this.minutes.push(val);
        }
    }

    meridiem = ['AM', 'PM'];

    selectedHour;
    selectedMinute;
    selectedMeridiem;

    optionHandler(event) {
        const { label, value } = event.detail;
        if (label === 'Hour(s)') {
            this.selectedHour = value;
        } else if (label === 'Minute(s)') {
            this.selectedMinute = value;
        } else if (label === 'AM/PM') {
            this.selectedMeridiem = value;
        }
        console.log('Selected Hour: ', this.selectedHour);
        console.log('Selected Minute: ', this.selectedMinute);
        console.log('Selected Meridiem: ', this.selectedMeridiem);
    }

    get isFieldSelected() {
        return !(
            this.selectedHour &&
            this.selectedMinute &&
            this.selectedMeridiem
        );
    }

    get shakeImage() {
        return this.isAlarmTriggered ? 'shake' : '';
    }

    alarmTime;
    isAlarmTriggered = false;
    isAlarmSet = false;

    setAlarmHandler() {
        this.alarmTime = `${this.selectedHour}:${this.selectedMinute} ${this.selectedMeridiem}`;
        console.log('Alarm Time: ', this.alarmTime);
        this.alarmSetMessage = `Your alarm is set for ${this.alarmTime}`;
        this.isAlarmSet = true; // Alarm is set
        this.isAlarmTriggered = false; // Reset alarm trigger flag
    }

    clearAlarmHandler() {
        this.alarmTime = '';
        this.isAlarmSet = false;
        this.isAlarmTriggered = false;
        this.ringtone.pause();
        this.ringtone.currentTime = 0; // Reset the ringtone to the start
        this.alarmSetMessage = ''; // Clear the alarm set message
        const elements = this.template.querySelectorAll('c-clock-drop-down');
        Array.from(elements).forEach((element) => {
            element.reset('');
        });
    }
}
