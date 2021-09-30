let timeHours;
let timeMinutes;
let timeSeconds;
let setAlarmArray = []
let alarmInterval;
let setAlarmAudio;
let stopwatchInterval;
let stopwatchMinutes;
let stopwatchSeconds;
let stopwatchTotalSeconds;
let stopwatchOffset = 0;
let pauseStopwatchBoolean = false;
let stopwatchAudio;

let timeTimeout = setInterval(() => {
    let date = new Date();
    timeHours = date.getHours();
    timeMinutes = date.getMinutes();
    timeSeconds = date.getSeconds();
    document.getElementById('time-hour').textContent = timeHours;
    document.getElementById('time-minute').textContent = timeMinutes;
    document.getElementById('time-seconds').textContent = timeSeconds;
}, 1000)

document.getElementById('stopwatch-border').style.strokeDashoffset = 1131

function changeTab(tab) {
    if(tab === 'set-stopwatch') {
        document.getElementById('set-alarm').style.display = 'none'
        document.getElementById('set-alarmTabButton').style.color = '#DBB3B1'
        document.getElementById('set-alarmTabButton').style.backgroundColor = '#2C1A1D'
    }
    else {
        document.getElementById('set-stopwatch').style.display = 'none'
        document.getElementById('set-stopwatchTabButton').style.color = '#DBB3B1'
        document.getElementById('set-stopwatchTabButton').style.backgroundColor = '#2C1A1D'
    }
    
    document.getElementById(tab).style.display = 'block'
    document.getElementById(tab+'TabButton').style.color = '#2C1A1D'
    document.getElementById(tab+'TabButton').style.backgroundColor = '#DBB3B1'
}

function setAlarm() {
    console.log('hello')
    let hour = document.getElementById('alarm-input-hour').value ? document.getElementById('alarm-input-hour').value : 0
    let minute = document.getElementById('alarm-input-minute').value ? document.getElementById('alarm-input-minute').value : 0
    let second = document.getElementById('alarm-input-second').value ? document.getElementById('alarm-input-second').value : 0
    setAlarmArray = [hour, minute, second]
    console.log(setAlarmArray)
    document.getElementById('set-alarm-button').style.display = 'none'
    document.getElementById('reset-alarm-button').style.display = 'block'
    alarmInterval = setInterval(() => {
        console.log('Time', setAlarmArray, [timeHours, timeMinutes, timeSeconds])
        if(timeHours == setAlarmArray[0] && timeMinutes == setAlarmArray[1] && timeSeconds == setAlarmArray[2]) {
            console.log('Alarm')
            setAlarmAudio = new Audio('media/happyrock.mp3');
            setAlarmAudio.play();
        }
    }, 1000)
}

function resetAlarm() {
    setAlarmAudio.pause()
    setAlarmAudio.currentTime = 0
    clearInterval(alarmInterval)
    document.getElementById('alarm-input-hour').value = ''
    document.getElementById('alarm-input-minute').value = ''
    document.getElementById('alarm-input-second').value = ''
    document.getElementById('set-alarm-button').style.display = 'block'
    document.getElementById('reset-alarm-button').style.display = 'none'
}

function setStopwatch() {
    stopwatchMinutes = document.getElementById('stopwatch-input-minute').value ? parseInt(document.getElementById('stopwatch-input-minute').value) : 00
    stopwatchSeconds = document.getElementById('stopwatch-input-second').value ? parseInt(document.getElementById('stopwatch-input-second').value) : 00
    if((stopwatchMinutes <= 0 && stopwatchSeconds <= 0) || stopwatchMinutes < 0 || stopwatchSeconds < 0 || stopwatchSeconds > 59) {
        document.getElementById('error-stopwatch').textContent = 'Invalid time'
    } else {
        document.getElementById('stopwatch-time').textContent = stopwatchMinutes + ' : ' + stopwatchSeconds
        document.getElementById('set-stopwatch-button').style.display = 'none'
        stopwatchTotalSeconds = (stopwatchMinutes*60) + stopwatchSeconds
        startStopwatch()
        document.getElementById('error-stopwatch').textContent = ''
    }
}

function startStopwatch() {
    stopwatchOffset = 1131 / stopwatchTotalSeconds
    stopwatchInterval = setInterval(() => {
        document.getElementById('stopwatch-border').style.transition = 'all 1s linear';
        document.getElementById('stopwatch-border').style.strokeDashoffset = document.getElementById('stopwatch-border').style.strokeDashoffset - stopwatchOffset
        if(stopwatchSeconds === 0) {
            stopwatchMinutes --
            stopwatchSeconds = 59
        } else {
            stopwatchSeconds--
        }
        document.getElementById('stopwatch-time').textContent = stopwatchMinutes + ' : ' + stopwatchSeconds
        if(document.getElementById('stopwatch-border').style.strokeDashoffset <= 0.5) {
            stopwatchAudio = new Audio('media/anewbeginning.mp3');
            stopwatchAudio.play();
            clearInterval(stopwatchInterval)
        }
    }, 1000)
    document.getElementById('pause-stopwatch-button').style.display = 'block'
}

function pauseStopwatch() {
    if(stopwatchMinutes >0 && stopwatchSeconds > 0) {
        if(pauseStopwatchBoolean === false) {
            document.getElementById('pause-stopwatch-button').textContent = 'Play'
            clearInterval(stopwatchInterval)
            pauseStopwatchBoolean = true
        } else {
            startStopwatch()
            pauseStopwatchBoolean = false
            document.getElementById('pause-stopwatch-button').textContent = 'Pause'
        }
    }
}

function resetStopwatch() {
    stopwatchAudio.pause()
    stopwatchAudio.currentTime = 0
    document.getElementById('stopwatch-input-minute').value = ''
    document.getElementById('stopwatch-input-second').value = ''
    document.getElementById('stopwatch-border').style.strokeDashoffset = '1131'
    document.getElementById('pause-stopwatch-button').style.display = 'none'
    document.getElementById('set-stopwatch-button').style.display = 'block'
}