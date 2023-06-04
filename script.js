document.addEventListener('DOMContentLoaded', function() {
    // Elements
    var breakLengthElement = document.getElementById('break-length');
    var sessionLengthElement = document.getElementById('session-length');
    var timerLabelElement = document.getElementById('timer-label');
    var timeLeftElement = document.getElementById('time-left');
    var startStopButton = document.getElementById('start_stop');
    var resetButton = document.getElementById('reset');
    var beepSound = document.getElementById('beep');
  
    // Initial values
    var breakLength = 5;
    var sessionLength = 25;
    var secondsRemaining = sessionLength * 60;
    var isRunning = false;
    var timerInterval = null;
  
    // Update displayed values
    breakLengthElement.textContent = breakLength;
    sessionLengthElement.textContent = sessionLength;
    timeLeftElement.textContent = formatTime(secondsRemaining);
  
    // Event listeners
    document.getElementById('break-decrement').addEventListener('click', decrementBreakLength);
    document.getElementById('break-increment').addEventListener('click', incrementBreakLength);
    document.getElementById('session-decrement').addEventListener('click', decrementSessionLength);
    document.getElementById('session-increment').addEventListener('click', incrementSessionLength);
    startStopButton.addEventListener('click', startStopTimer);
    resetButton.addEventListener('click', resetTimer);
  
    // Functions
  
    // Format time in mm:ss format
    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
      return minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toString().padStart(2, '0');
    }
  
    // Update the displayed time remaining
    function updateTimer() {
      timeLeftElement.textContent = formatTime(secondsRemaining);
      if (secondsRemaining === 0) {
        beepSound.play();
        if (timerLabelElement.textContent === 'Session') {
          timerLabelElement.textContent = 'Break';
          secondsRemaining = breakLength * 60;
        } else {
          timerLabelElement.textContent = 'Session';
          secondsRemaining = sessionLength * 60;
        }
      } else {
        secondsRemaining--;
      }
    }
  
    // Start or stop the timer
    function startStopTimer() {
      if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
      } else {
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
        startStopButton.textContent = 'Stop';
      }
    }
  
    // Reset the timer to its initial state
    function resetTimer() {
      clearInterval(timerInterval);
      isRunning = false;
      startStopButton.textContent = 'Start';
      timerLabelElement.textContent = 'Session';
      breakLength = 5;
      sessionLength = 25;
      secondsRemaining = sessionLength * 60;
      breakLengthElement.textContent = breakLength;
      sessionLengthElement.textContent = sessionLength;
      timeLeftElement.textContent = formatTime(secondsRemaining);
      beepSound.pause();
      beepSound.currentTime = 0;
    }
  
    // Decrement the break length
    function decrementBreakLength() {
      if (breakLength > 1 && !isRunning) {
        breakLength--;
        breakLengthElement.textContent = breakLength;
      }
    }
  
    // Increment the break length
    function incrementBreakLength() {
      if (breakLength < 60 && !isRunning) {
        breakLength++;
        breakLengthElement.textContent = breakLength;
      }
    }
  
    // Decrement the session length
    function decrementSessionLength() {
      if (sessionLength > 1 && !isRunning) {
        sessionLength--;
        secondsRemaining = sessionLength * 60;
        sessionLengthElement.textContent = sessionLength;
        timeLeftElement.textContent = formatTime(secondsRemaining);
      }
    }
  
    // Increment the session length
    function incrementSessionLength() {
      if (sessionLength < 60 && !isRunning) {
        sessionLength++;
        secondsRemaining = sessionLength * 60;
        sessionLengthElement.textContent = sessionLength;
        timeLeftElement.textContent = formatTime(secondsRemaining);
      }
    }
  });
  