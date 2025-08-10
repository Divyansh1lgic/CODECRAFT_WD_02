let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const clearLapsBtn = document.getElementById("clearLaps");
const lapsList = document.getElementById("laps");

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = `${h}:${m}:${s}`;
}

function startStopwatch() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        stopStopwatch();
        startStopBtn.textContent = "Resume";
    } else {
        startStopwatch();
        startStopBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener("click", () => {
    stopStopwatch();
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    startStopBtn.textContent = "Start";
    isRunning = false;
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        lapCount++;
        let lapTime = display.textContent;
        let li = document.createElement("li");
        li.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(li);
    }
});

clearLapsBtn.addEventListener("click", () => {
    lapsList.innerHTML = "";
    lapCount = 0;
});

updateDisplay();
