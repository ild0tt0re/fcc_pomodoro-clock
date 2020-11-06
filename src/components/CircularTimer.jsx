import React, { useRef, useEffect } from 'react';
import './CircularTimer.scss';

export default function CircularTimer({
  timerLabel,
  timeLeft,
  isTimerOn,
  currentLengthTime,
  setAnimation,
  resetTimer,
}) {
  const d = 100,
    o = -0.5 * d,
    sw = 0.1 * d,
    r = 0.5 * (d - sw),
    len = 2 * Math.PI * r;

  const arcEl = useRef(null);

  useEffect(() => {
    const ringAnimation = arcEl.current?.animate(
      [
        { strokeDashoffset: 0, stroke: '#8a9b0f' },
        { color: '#f8ca00' },
        { color: '#e97f02' },
        { color: '#bd1550' },
        { strokeDashoffset: len, stroke: '#490a3d' },
      ],
      {
        duration: currentLengthTime * 1000,
        iterations: Infinity,
      }
    );
    ringAnimation.pause();
    console.log('ringAnimation: ', ringAnimation.effect.getComputedTiming());
    setAnimation(ringAnimation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLengthTime, len]);

  return (
    <>
      <div className="timer-container">
        <div className="countdown">
          <svg viewBox={[o, o, d, d].join(' ')} strokeWidth={sw}>
            <circle r={r}></circle>
            <circle
              ref={arcEl}
              r={r}
              strokeDasharray={len}
              strokeDashoffset={`${len}px`}
            ></circle>
          </svg>
        </div>

        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">
          {String(parseInt(timeLeft / 60)).padStart(2, 0)}:
          {String(timeLeft - parseInt(timeLeft / 60) * 60).padStart(2, 0)}
        </div>
        <button id="reset" onClick={resetTimer}>
          reset
        </button>
      </div>
    </>
  );
}
