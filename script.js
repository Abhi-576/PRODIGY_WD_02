let stopwatchInterval;
let isRunning = false;
let startTime;
let lastLapTime = 0; 
let elapsedTime = 0;
let laps = [];

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10); 
    document.querySelector('.start').textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(stopwatchInterval);
    document.querySelector('.start').textContent = 'Resume';
    isRunning = false;
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(stopwatchInterval);
    document.querySelector('.start').textContent = 'Start';
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  document.querySelector('.start').textContent = 'Start';
  document.querySelector('.display').textContent = '00:00:00.000';
  isRunning = false;
  elapsedTime = 0;
  laps = [];
  lastLapTime = 0;
  updateLapsUI();
}

function recordLap() {
  if (isRunning) {
    let lapTime = Date.now() - startTime;
    let formattedLapTime = formatTime(lapTime);
    
    
    let lapInterval = lapTime - lastLapTime;
    if (lastLapTime === 0) {
      lapInterval = lapTime; 
    }
    lastLapTime = lapTime;
    
    let formattedLapInterval = formatTime(lapInterval);
    
    laps.push({ lapTime: formattedLapTime, lapInterval: formattedLapInterval });
    updateLapsUI();
  }
}

function updateStopwatch() {
  elapsedTime = Date.now() - startTime;
  document.querySelector('.display').textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  let hours = Math.floor(time / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((time % 1000));
  
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
}

function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function updateLapsUI() {
  const lapsList = document.querySelector('.laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.innerHTML = `<strong>Lap ${index + 1}:</strong> ${lap.lapTime} (Interval: ${lap.lapInterval})`;
    lapsList.appendChild(lapItem);
  });
}
