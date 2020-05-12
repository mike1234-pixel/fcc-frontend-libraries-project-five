import React, { Component } from "react";
import alert1 from "./AudioFiles/alert1.mp3";
import alert2 from "./AudioFiles/alert2.mp3";
import alert3 from "./AudioFiles/alert3.mp3";

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      sessionMinutes: 25,
      sessionSeconds: 0,
      sessionMinutesDecrementing: 25,
      sessionSecondsDecrementing: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      breakMinutesDecrementing: 5,
      breakSecondsDecrementing: 0,
      sequenceNumber: 0,
    };
    this.incrementSessionMinutes = this.incrementSessionMinutes.bind(this);
    this.decrementSessionMinutes = this.decrementSessionMinutes.bind(this);
    this.incrementBreakMinutes = this.incrementBreakMinutes.bind(this);
    this.decrementBreakMinutes = this.decrementBreakMinutes.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setMinutesIncrement = this.setMinutesIncrement.bind(this);
    this.setMinutesDecrement = this.setMinutesDecrement.bind(this);
    this.setBreakMinutesIncrement = this.setBreakMinutesIncrement.bind(this);
    this.setBreakMinutesDecrement = this.setBreakMinutesDecrement.bind(this);
  }

  // click handlers for session minutes (increment and decrement)
  incrementSessionMinutes() {
    this.setState((prevState) => {
      return {
        sessionMinutes:
          prevState.sessionMinutes === 60
            ? prevState.sessionMinutes
            : prevState.sessionMinutes + 1,
      };
    });
  }
  // ternary stops user incrementing session length to greater than 60

  decrementSessionMinutes() {
    this.setState((prevState) => {
      return {
        sessionMinutes:
          prevState.sessionMinutes <= 1
            ? prevState.sessionMinutes
            : prevState.sessionMinutes - 1,
      };
    });
  }

  // ternary stops user decrementing session length to less than 1 minute

  // click handlers for break minutes (increment and decrement)

  incrementBreakMinutes() {
    this.setState((prevState) => {
      return {
        breakMinutes: prevState.breakMinutes + 1,
      };
    });
  }

  decrementBreakMinutes() {
    this.setState((prevState) => {
      return {
        breakMinutes:
          prevState.breakMinutes <= 1
            ? prevState.breakMinutes
            : prevState.breakMinutes - 1,
      };
    });
  }

  // below four functions coordinate user deifned session lengths with what's displayed in the timer, this is changed to
  // what's in the throwaway timer variables in handleStart

  setMinutesIncrement() {
    this.setState({
      sessionMinutesDecrementing: this.state.sessionMinutes + 1,
    });
  }

  setMinutesDecrement() {
    this.setState({
      sessionMinutesDecrementing:
        this.state.sessionMinutes <= 1 ? 1 : this.state.sessionMinutes - 1,
    });
  }

  setBreakMinutesIncrement() {
    this.setState({
      breakMinutesDecrementing: this.state.breakMinutes + 1,
    });
  }

  setBreakMinutesDecrement() {
    this.setState({
      breakMinutesDecrementing:
        this.state.breakMinutes <= 1 ? 1 : this.state.breakMinutes - 1,
    });
  }

  // start

  handleStart() {
    //disable start button
    this.refs.btn.setAttribute("disabled", "disabled");

    this.setState((prevState) => {
      return {
        sequenceNumber: prevState.sequenceNumber + 1,
      };
    });

    console.log(this.state.sequenceNumber);

    //declare throwaway vars
    let sessionMinutesTimer = this.state.sessionMinutes;
    let sessionSecondsTimer = this.state.sessionSeconds;

    this.myInterval = setInterval(() => {
      if (sessionSecondsTimer > 0) {
        sessionSecondsTimer = sessionSecondsTimer - 1;
        this.setState(() => {
          return {
            sessionSecondsDecrementing: sessionSecondsTimer,
          };
        });
      }
      if (sessionSecondsTimer === 0) {
        if (sessionMinutesTimer === 0) {
          clearInterval(this.myInterval);

          // run next function and play audio here
          // if sequenceNumber is not zero and is divisible by 4, run startLongBreakTimer function, else run startBreakTimer
          if (
            this.state.sequenceNumber !== 0 &&
            this.state.sequenceNumber % 4 === 0
          ) {
            const alertThree = new Audio(alert3);
            alertThree.play();
            this.startLongBreakTimer();
          } else {
            const alertOne = new Audio(alert1);
            alertOne.play();
            this.startBreakTimer();
          }
        } else {
          sessionMinutesTimer = sessionMinutesTimer - 1;
          sessionSecondsTimer = 59;
          this.setState(() => {
            return {
              sessionMinutesDecrementing: sessionMinutesTimer,
              sessionSecondsDecrementing: sessionSecondsTimer,
            };
          });
        }
      }
    }, 1000);
  }
  // handleStart does trigger startBreakTimer at the end, so there must be a problem with startBreakTimer itself

  startBreakTimer() {
    //declare throwaway vars
    let breakMinutesTimer = this.state.breakMinutes;
    let breakSecondsTimer = this.state.breakSeconds;

    this.myInterval = setInterval(() => {
      if (breakSecondsTimer > 0) {
        breakSecondsTimer = breakSecondsTimer - 1;
        this.setState(() => {
          return {
            breakSecondsDecrementing: breakSecondsTimer,
          };
        });
      }
      if (breakSecondsTimer === 0) {
        if (breakMinutesTimer === 0) {
          clearInterval(this.myInterval);
          const alertTwo = new Audio(alert2);
          alertTwo.play();
          // run next function and play audio here

          setTimeout(this.handleStart, 2000);
        } else {
          breakMinutesTimer = breakMinutesTimer - 1;
          breakSecondsTimer = 59;
          this.setState(() => {
            return {
              breakMinutesDecrementing: breakMinutesTimer,
              breakSecondsDecrementing: breakSecondsTimer,
            };
          });
        }
      }
    }, 1000);
  }

  startLongBreakTimer() {
    let breakMinutesTimer = this.state.breakMinutes * 4;
    let breakSecondsTimer = this.state.breakSeconds;

    this.myInterval = setInterval(() => {
      if (breakSecondsTimer > 0) {
        breakSecondsTimer = breakSecondsTimer - 1;
        this.setState(() => {
          return {
            breakSecondsDecrementing: breakSecondsTimer,
          };
        });
      }
      if (breakSecondsTimer === 0) {
        if (breakMinutesTimer === 0) {
          clearInterval(this.myInterval);
          const alertOne = new Audio(alert1);
          alertOne.play();
          // run next function and play audio here

          setTimeout(this.handleStart, 2000);
        } else {
          breakMinutesTimer = breakMinutesTimer - 1;
          breakSecondsTimer = 59;
          this.setState(() => {
            return {
              breakMinutesDecrementing: breakMinutesTimer,
              breakSecondsDecrementing: breakSecondsTimer,
            };
          });
        }
      }
    }, 1000);
  }

  // reset

  handleReset() {
    this.refs.btn.removeAttribute("disabled", "disabled");
    this.setState((prevState) => {
      return {
        sessionMinutes: 25,
        sessionSeconds: 0,
        sessionMinutesDecrementing: 25,
        sessionSecondsDecrementing: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        breakMinutesDecrementing: 5,
        breakSecondsDecrementing: 0,
        sequenceNumber: 0,
      };
    });
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-header">
          Pomodoro<br></br> Clock
        </h1>
        <div id="session-div">
          <h2>
            Session Length:{" "}
            {this.state.sessionMinutes === 1
              ? +this.state.sessionMinutes + " minute"
              : this.state.sessionMinutes + " minutes"}
          </h2>
          <button
            className="button"
            onClick={() => {
              this.setMinutesIncrement();
              this.incrementSessionMinutes();
            }}
            id="session-increment"
          >
            +
          </button>
          <button
            className="button"
            onClick={() => {
              this.setMinutesDecrement();
              this.decrementSessionMinutes();
            }}
            id="session-decrement"
          >
            -
          </button>
        </div>
        <div id="clock">
          <h2 id="time-left" className="timer">
            <span id="session-length">
              {this.state.sessionMinutesDecrementing}
            </span>
            :
            {this.state.sessionSecondsDecrementing < 10
              ? "0" + this.state.sessionSecondsDecrementing
              : this.state.sessionSecondsDecrementing}
          </h2>
          <button
            className="button"
            onClick={this.handleStart}
            id="start_stop"
            ref="btn"
          >
            Start
          </button>
          <button className="button" onClick={this.handleReset} id="reset">
            Reset
          </button>
        </div>
        <div id="break-div">
          <h2>
            Break Length:{" "}
            {this.state.breakMinutes === 1
              ? +this.state.breakMinutes + " minute"
              : this.state.breakMinutes + " minutes"}
          </h2>
          <button
            className="button"
            onClick={() => {
              this.setBreakMinutesIncrement();
              this.incrementBreakMinutes();
            }}
            id="break-increment"
          >
            +
          </button>
          <button
            className="button"
            onClick={() => {
              this.setBreakMinutesDecrement();
              this.decrementBreakMinutes();
            }}
            id="break-decrement"
          >
            -
          </button>

          <h2 id="break-length" className="timer">
            {" "}
            <span id="break-length">{this.state.breakMinutesDecrementing}</span>
            :
            {this.state.breakSecondsDecrementing < 10
              ? "0" + this.state.breakSecondsDecrementing
              : this.state.breakSecondsDecrementing}
          </h2>
          <h2>Long Break Length: {this.state.breakMinutes * 4 + " minutes"}</h2>
          <h3>Current Pomodoro:</h3>
          <p className="timer">{this.state.sequenceNumber}</p>
          <br></br>
          <p>Designed and built by Michael Tandy</p>
        </div>
      </div>
    );
  }
}

export default Clock;

// Attributions for audio files
// alert1.mp3 - 'Text Message alert 4' by Daniel Simon -  This audio file is made available under the Creative Commons 3.0 licence:  http://soundbible.com/2154-Text-Message-Alert-1.html
// alert2.mp3 - 'Text Message alert 1' by Daniel Simon -  This audio file is made available under the Creative Commons 3.0 licence: http://soundbible.com/2157-Text-Message-Alert-4.html
// alert3.mp3 - 'Text Message alert 3' by Daniel Simon -  This audio file is made available under the Creative Commons 3.0 licence: http://soundbible.com/2156-Text-Message-Alert-3.html
