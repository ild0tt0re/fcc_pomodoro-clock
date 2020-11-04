import React from 'react';

export default function QuantitySelector({
  name,
  incrementLengthTime,
  lengthTime,
  decrementLengthTime,
}) {
  return (
    <div className={`${name}-container`}>
      <div id={`${name}-label`}>{name} Length</div>
      <button
        id={`${name}-increment`}
        onClick={incrementLengthTime}
        disabled={lengthTime / 60 === 60}
      >
        +
      </button>
      <div id={`${name}-length`}>{lengthTime / 60}</div>
      <button
        id={`${name}-decrement`}
        onClick={decrementLengthTime}
        disabled={lengthTime / 60 === 1}
      >
        -
      </button>
    </div>
  );
}