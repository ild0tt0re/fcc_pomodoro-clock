import { useEffect, useState, useRef } from 'react';
import QuantitySelector from './components/QuantitySelector';
import './styles/App.scss';

const initialTimerLabelState = 'Session';
const initialIsTimerOnState = false;

const initialSessionLengthState = 1500;
const initialBreakLengthState = 300;

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

  const audioEl = useRef(null);

  useEffect(() => {
    if (timerLabel === initialTimerLabelState) {
      setTimeLeft(sessionLengthTime);
    } else {
      setTimeLeft(breakLengthTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerLabel]);

  useEffect(() => {
    let interval;

    if (isTimerOn) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        console.log('timeLeft: ', timeLeft);

        if (timeLeft === 1) {
          function playAudio() {
            let playPromise = audioEl.current.play();

            if (playPromise !== undefined) {
              playPromise
                .then((_) => {
                  setTimeout(() => {
                    audioEl.current.pause();
                    audioEl.current.currentTime = 0;
                  }, 1000);
                })
                .catch((error) => {
                  console.error('Error while play audio...', error);
                });
            }
          }
          playAudio();
        }
        if (timeLeft === 0) {
          function switchTimer() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setTimerLabel(initialTimerLabelState);
    setSessionLengthTime(initialSessionLengthState);
    setBreakLengthTime(initialBreakLengthState);
    setTimeLeft(initialSessionLengthState);

    if (!audioEl.current.paused) {
      audioEl.current.pause();
      audioEl.current.currentTime = 0;
    }
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

        <QuantitySelector
          name="session"
          lengthTime={sessionLengthTime}
          incrementLengthTime={incrementSessionLengthTime}
          decrementLengthTime={decrementSessionLengthTime}
        />
        <QuantitySelector
          name="break"
          lengthTime={breakLengthTime}
          incrementLengthTime={incrementBreakLengthTime}
          decrementLengthTime={decrementBreakLengthTime}
        />
        <audio id="beep" preload="auto" ref={audioEl}>
          <source src="/src/assets/BeepSound.wav" type="audio/wav" />
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    </div>
  );
}

export default App;
