// Get DOM elements
const currentTimeDisplay = document.getElementById('current-time');
const alarmTimeDisplay = document.getElementById('alarm-time');
const setAlarmInput = document.getElementById('alarm-set');
const setAlarmButton = document.getElementById('set-alarm');
const deactivateAlarmButton = document.getElementById('deactivate-alarm');
const container = document.querySelector('.container');
const alarmAudio = new Audio('alarm_sound.mp3');

let alarmTime;
let alarmInterval;
let flashingInterval;
let isFlashing = false;
container.style.backgroundColor = 'grey';

// Function to update current time display
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;
    currentTimeDisplay.textContent = `Current Time: ${currentTime}`;
}

// Function to set alarm time
function setAlarm() {
    alarmTime = setAlarmInput.value;
    alarmTimeDisplay.textContent = `Alarm Time: ${alarmTime}`;
}


// Function to deactivate alarm and turn off alarm sound
function deactivateAlarm() {
    clearInterval(alarmInterval);
    alarmTime = null;
    alarmTimeDisplay.textContent = `Alarm Time:`;
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    isFlashing = false; // Reset the flashing state
}



// Function to check if it's time for the alarm
function checkAlarm() {
    if (!alarmTime) return; // If alarm time is not set, return

    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    if (currentTime === alarmTime) {
        flashPage();
        alarmAudio.play();
        // Set interval to check if alarm is deactivated
        alarmInterval = setInterval(() => {
            if (!alarmAudio.paused) return;
            stopFlash(); // Stop the flashing animation
            deactivateAlarm();
        }, 1000);
    }
}



// Function to flash the page
function flashPage() {
    container.style.animation = 'flash 1s infinite'; // Apply the "flash" animation
}

// Function to stop the flashing animation
function stopFlash() {
    container.style.animation = 'none'; // Remove the animation
}


// Event listener for deactivate alarm button
deactivateAlarmButton.addEventListener('click', function() {
    deactivateAlarm();
});

// Event listeners
setAlarmButton.addEventListener('click', setAlarm);

// Update current time every second
setInterval(updateClock, 1000);
setInterval(checkAlarm, 1000);

//comment
