import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";

function PomodoroClock({ cyclesLimit = 3 }) {
  const [timer, setTimer] = useState(25 * 60); // Initial timer value is 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // Initial break time is 5 minutes in seconds
  const [cycleCount, setCycleCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          if (isBreak) {
            if (cycleCount + 1 >= cyclesLimit) {
              stopTimer();
              return;
            }

            setCycleCount((cycleCount) => cycleCount + 1);
            setIsBreak(false);
            setTimer(25 * 60);
          } else {
            setIsBreak(true);
            setTimer(breakTime);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, isRunning, isBreak, cycleCount, cyclesLimit, breakTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(25 * 60);
    setBreakTime(5 * 60);
    setCycleCount(0);
    setIsBreak(false);
    setIsRunning(false);
  };
  const remainingCycles = cyclesLimit - cycleCount;

  return (
    <div className="main">
      <header>Pomodoro Clock</header>
      <div className="time">
        <Row>
          <Col sm={4}>
            <div className="timer">
              <p>Timer: </p>
              <p>
                {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div className="timer">
              <p>Break Time:</p>
              <p>
                {" "}
                {Math.floor(breakTime / 60)}:
                {breakTime % 60 < 10 ? `0${breakTime % 60}` : breakTime % 60}
              </p>
            </div>
          </Col>
          <Col sm={4}>
            {" "}
            <div className="timer">
              <p>Remaining Cycles: </p>
              <p>{remainingCycles}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div className="btn-main">
        <Row>
          <Col sm={4}>
            <div className="btn2">
              <button
                className="timer-btn"
                onClick={startTimer}
                disabled={isRunning}
              >
                Start
              </button>
            </div>
          </Col>
          <Col sm={4}>
            <div className="btn2">
              <button
                className="timer-btn"
                onClick={stopTimer}
                disabled={!isRunning}
              >
                Stop
              </button>
            </div>
          </Col>
          <Col sm={4}>
            <div className="btn2">
              <button className="timer-btn" onClick={resetTimer}>
                Reset
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <footer>© 2023 Copyright: INNERHOUR</footer>
    </div>
  );
}

export default PomodoroClock;
