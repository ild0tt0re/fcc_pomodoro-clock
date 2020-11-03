import { useEffect, useState } from 'react';
import './styles/App.scss';

const initialTimerLabelState = 'Session';
const initialIsTimerOnState = false;

const initialSessionLengthState = 10;/* 1500; */
const initialBreakLengthState = 10;/* 300; */

function App() {
  const [timerLabel, setTimerLabel] = useState(initialTimerLabelState);
  const [timeLeft, setTimeLeft] = useState(initialSessionLengthState);

  const [sessionLengthTime, setSessionLengthTime] = useState(
    initialSessionLengthState
  );
  const [breakLengthTime, setBreakLengthTime] = useState(
    initialBreakLengthState
  );

  const [isTimerOn, setIsTimerOn] = useState(initialIsTimerOnState);

  useEffect(() => {
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(sessionLengthTime);
    } else {
      setTimeLeft(breakLengthTime);
    }
  }, [timerLabel]);

  useEffect(() => {
    let interval;

    if (isTimerOn) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        console.log('timeLeft: ', timeLeft);

        if (timeLeft === 0) {
          function switchTimer(params) {
            if (timerLabel === initialTimerLabelState) {
              setTimerLabel('Break');
              setTimeLeft(sessionLengthTime);
            } else {
              setTimerLabel('Session');
              setTimeLeft(breakLengthTime);
            }
          }
          switchTimer();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerOn, timeLeft]);

  const incrementSessionLengthTime = (e) => {
    setSessionLengthTime(sessionLengthTime + 60);
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(sessionLengthTime + 60);
    }
  };

  const decrementSessionLengthTime = (e) => {
    setSessionLengthTime(sessionLengthTime - 60);
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(sessionLengthTime - 60);
    }
  };

  const incrementBreakLengthTime = (e) => {
    setBreakLengthTime(breakLengthTime + 60);
    if (timerLabel !== initialTimerLabelState) {
      setTimeLeft(breakLengthTime + 60);
    }
  };

  const decrementBreakLengthTime = (e) => {
    setBreakLengthTime(breakLengthTime - 60);
    if (timerLabel === !initialTimerLabelState) {
      setTimeLeft(breakLengthTime - 60);
    }
  };

  const startStopTimer = (e) => {
    setIsTimerOn(!isTimerOn);
  };

  const resetTimer = (e) => {
    setIsTimerOn(false);
    setSessionLengthTime(initialSessionLengthState);
    setBreakLengthTime(initialBreakLengthState);
    setTimeLeft(initialSessionLengthState);
  };

  return (
    <div className="App">
      <div className="pomodoro-wrapper">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">
          {String(parseInt(timeLeft / 60)).padStart(2, 0)}:
          {String(timeLeft - parseInt(timeLeft / 60) * 60).padStart(2, 0)}
        </div>
        <button id="start_stop" onClick={startStopTimer}>
          Start/Pause
        </button>
        <button id="reset" onClick={resetTimer}>
          reset
        </button>

        <div className="session-container">
          <div id="session-label">Session Length</div>
          <button
            id="session-increment"
            onClick={incrementSessionLengthTime}
            disabled={sessionLengthTime / 60 === 60}
          >
            +
          </button>
          <div id="session-length">{sessionLengthTime / 60}</div>
          <button
            id="session-decrement"
            onClick={decrementSessionLengthTime}
            disabled={sessionLengthTime / 60 === 1}
          >
            -
          </button>
        </div>

        <div className="break-container">
          <div id="break-label">Break Length</div>
          <button
            id="break-increment"
            onClick={incrementBreakLengthTime}
            disabled={breakLengthTime / 60 === 60}
          >
            +
          </button>
          <div id="break-length">{breakLengthTime / 60}</div>
          <button
            id="break-decrement"
            onClick={decrementBreakLengthTime}
            disabled={breakLengthTime / 60 === 1}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
