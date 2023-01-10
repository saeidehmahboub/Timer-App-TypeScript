import { useCallback, useEffect, useState } from "react";

import "./Timer.scss";

const DEFAULT_TIME: number = 60;

const Timer = () => {
  const [counter, setCounter] = useState(DEFAULT_TIME);
  const [isStopClicked, setIsStopClicked] = useState<boolean>(false);

  let timer: string | number | NodeJS.Timeout | undefined;

  const clearTimer = () => {
    clearTimeout(timer);
  };

  useEffect(() => {
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => {
      clearTimer();
    };
  }, [counter]);

  const startHandler = useCallback(() => {
    if (isStopClicked && counter > 0) {
      setCounter(counter - 1);
      setIsStopClicked(false);
    } else {
      setCounter(DEFAULT_TIME);
    }
    clearTimer();
  }, [counter, isStopClicked, clearTimer]);

  const stopHandler = useCallback(() => {
    setIsStopClicked(true);
    clearTimer();
  }, [setIsStopClicked, clearTimer]);

  return (
    <div className="timer-content">
      <h1 className="timer">{counter}</h1>

      <div className="timer-buttons">
        <button className="start-button" onClick={startHandler}>
          Start
        </button>
        <button className="stop-button" onClick={stopHandler}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Timer;
