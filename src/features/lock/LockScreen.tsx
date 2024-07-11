import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addDigit, removeDigit, checkPin, reset } from './lockSlice';
import './LockScreen.css';

const LockScreen = () => {
  const dispatch = useDispatch();
  const { input, isAccessGranted } = useSelector((state: RootState) => state.lock);

  const handleDigitClick = (digit: string) => {
    dispatch(addDigit(digit));
  };

  const handleRemoveClick = () => {
    dispatch(removeDigit());
  };

  const handleEnterClick = () => {
    dispatch(checkPin());
  };

  const handleResetClick = () => {
    dispatch(reset());
  };

  const getInputDisplay = () => {
    return input.split('').map(() => '*').join('');
  };

  return (
    <div className="lock-screen">
      <div className={`input-display ${isAccessGranted === null ? '' : isAccessGranted ? 'granted' : 'denied'}`}>
        {getInputDisplay()}
      </div>
      <div className="buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
          <button key={digit} onClick={() => handleDigitClick(digit.toString())}>
            {digit}
          </button>
        ))}
        <button onClick={handleRemoveClick}>&lt;</button>
        <button onClick={handleEnterClick}>E</button>
      </div>
      {isAccessGranted === false && <div className="message">Access Denied</div>}
      {isAccessGranted === true && <div className="message">Access Granted</div>}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default LockScreen;