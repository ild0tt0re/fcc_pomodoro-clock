import React from 'react';
import './StartStopBtn.scss';
import { ReactComponent as StartWatchIcon } from '../assets/startwatch-icon.svg';

export default function StartStopBtn({ isTimerOn, startStopTimer }) {
  const btnStyleTimerOn = {
    color: '#fff',
    boxShadow: '0 0 40px 40px red inset',
  };

  return (
    <button
      id="start_stop"
      className="first"
      onClick={startStopTimer}
      style={isTimerOn ? btnStyleTimerOn : {}}
    >
      {isTimerOn ? 'Pause' : 'Start'}
      <StartWatchIcon className="startwatch-icon" />
    </button>
  );
}
