import React from 'react';
import './QuantitySelector.scss'
import { ReactComponent as ArrowUp } from '../assets/arrow-up.svg';

export default function QuantitySelector({
  name,
  lengthTime,
  isTimerOn,
  incrementLengthTime,
  decrementLengthTime,
}) {
  return (
    <div className={`${name}-container`}>
      <div id={`${name}-label`} className="label">{name} Length</div>
      <button
        id={`${name}-increment`}
        onClick={incrementLengthTime}
        disabled={lengthTime / 60 === 60 || isTimerOn}
      >
        <ArrowUp />
      </button>
      <div id={`${name}-length`} className="length">{lengthTime / 60}</div>
      <button
        id={`${name}-decrement`}
        onClick={decrementLengthTime}
        disabled={lengthTime / 60 === 1 || isTimerOn}
      >
        <ArrowUp style={{transform: 'rotate(180deg)'}} />
      </button>
    </div>
  );
}
