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
    
}

setStopwatch(10)

function setStopwatch(secs) {
    let offset = 1131 / secs
    let interval = setInterval(() => {
        document.getElementById('stopwatch-border').style.strokeDashoffset = document.getElementById('stopwatch-border').style.strokeDashoffset - offset
        console.log(document.getElementById('stopwatch-border').style.strokeDashoffset)
        if(document.getElementById('stopwatch-border').style.strokeDashoffset <= 0) {
            clearInterval(interval)
        }
    }, 1000)
}