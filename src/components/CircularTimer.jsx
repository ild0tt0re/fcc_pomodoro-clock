import React from 'react';

export default function CircularTimer({
  timerLabel,
  timeLeft,
  resetTimer,
}) {
  return (
    <div className="timer-container">
      <div id="timer-label">{timerLabel}</div>
      <div id="time-left">
        {String(parseInt(timeLeft / 60)).padStart(2, 0)}:
        {String(timeLeft - parseInt(timeLeft / 60) * 60).padStart(2, 0)}
      </div>
      <button id="reset" onClick={resetTimer}>
        reset
      </button>
    </div>
  );
}
