import React, { Component } from "react";
import alert1 from "./AudioFiles/alert1.mp3";

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
      sequenceNumber: 0
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
    this.setState(prevState => {
      return {
        sessionMinutes:
          prevState.sessionMinutes === 60
            ? prevState.sessionMinutes
            : prevState.sessionMinutes + 1
      };
    });
  }
  // ternary stops user incrementing session length to greater than 60

  decrementSessionMinutes() {
    this.setState(prevState => {
      return {
        sessionMinutes:
          prevState.sessionMinutes <= 1
            ? prevState.sessionMinutes
            : prevState.sessionMinutes - 1
      };
    });
  }

  // ternary stops user decrementing session length to less than 1 minute

  // click handlers for break minutes (increment and decrement)

  incrementBreakMinutes() {
    this.setState(prevState => {
      return {
        breakMinutes: prevState.breakMinutes + 1
      };
    });
  }

  decrementBreakMinutes() {
    this.setState(prevState => {
      return {
        breakMinutes:
          prevState.breakMinutes <= 1
            ? prevState.breakMinutes
            : prevState.breakMinutes - 1
      };
    });
  }

  // below four functions coordinate user deifned session lengths with what's displayed in the timer, this is changed to
  // what's in the throwaway timer variables in handleStart

  setMinutesIncrement() {
    this.setState({
      sessionMinutesDecrementing: this.state.sessionMinutes + 1
    });
  }

  setMinutesDecrement() {
    this.setState({
      sessionMinutesDecrementing: this.state.sessionMinutes - 1
    });
  }

  setBreakMinutesIncrement() {
    this.setState({
      breakMinutesDecrementing: this.state.breakMinutes + 1
    });
  }

  setBreakMinutesDecrement() {
    this.setState({
      breakMinutesDecrementing: this.state.breakMinutes - 1
    });
  }

  // start

  handleStart() {
    //disable start button
    this.refs.btn.setAttribute("disabled", "disabled");

    this.setState(prevState => {
      return {
        sequenceNumber: prevState.sequenceNumber + 1
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
            sessionSecondsDecrementing: sessionSecondsTimer
          };
        });
      }
      if (sessionSecondsTimer === 0) {
        if (sessionMinutesTimer === 0) {
          clearInterval(this.myInterval);

          const alertOne = new Audio(alert1);
          alertOne.play();
          // run next function and play audio here
          // if sequenceNumber is not zero and is divisible by 4, run startLongBreakTimer function, else run startBreakTimer
          if (
            this.state.sequenceNumber !== 0 &&
            this.state.sequenceNumber % 4 === 0
          ) {
            this.startLongBreakTimer();
          } else {
            this.startBreakTimer();
          }
        } else {
          sessionMinutesTimer = sessionMinutesTimer - 1;
          sessionSecondsTimer = 59;
          this.setState(() => {
            return {
              sessionMinutesDecrementing: sessionMinutesTimer,
              sessionSecondsDecrementing: sessionSecondsTimer
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
            breakSecondsDecrementing: breakSecondsTimer
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
              breakSecondsDecrementing: breakSecondsTimer
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
            breakSecondsDecrementing: breakSecondsTimer
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
              breakSecondsDecrementing: breakSecondsTimer
            };
          });
        }
      }
    }, 1000);
  }

  // reset

  handleReset() {
    this.refs.btn.removeAttribute("disabled", "disabled");
    this.setState(prevState => {
      return {
        sessionMinutes: 25,
        sessionSeconds: 0,
        sessionMinutesDecrementing: 25,
        sessionSecondsDecrementing: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        breakMinutesDecrementing: 5,
        breakSecondsDecrementing: 0
      };
    });
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div>
        <div id="session-div">
          <h2 id="session-label">Session Length</h2>
          <button
            onClick={() => {
              this.setMinutesIncrement();
              this.incrementSessionMinutes();
            }}
            id="session-increment"
          >
            +
          </button>
          <button
            onClick={() => {
              this.setMinutesDecrement();
              this.decrementSessionMinutes();
            }}
            id="session-decrement"
          >
            -
          </button>
          <h2>Session Minutes: {this.state.sessionMinutes}</h2>
        </div>
        <div id="clock">
          <h1 id="time-left">
            <span id="session-length">
              {this.state.sessionMinutesDecrementing}
            </span>
            :
            {this.state.sessionSecondsDecrementing < 10
              ? "0" + this.state.sessionSecondsDecrementing
              : this.state.sessionSecondsDecrementing}
          </h1>
          <button onClick={this.handleStart} id="start_stop" ref="btn">
            Start
          </button>
          <button onClick={this.handleReset} id="reset">
            Reset
          </button>
        </div>
        <div id="break-div">
          <h2 id="break-label">Break Length</h2>
          <button
            onClick={() => {
              this.setBreakMinutesIncrement();
              this.incrementBreakMinutes();
            }}
            id="break-increment"
          >
            +
          </button>
          <button
            onClick={() => {
              this.setBreakMinutesDecrement();
              this.decrementBreakMinutes();
            }}
            id="break-decrement"
          >
            -
          </button>
          <h2>Break Minutes: {this.state.breakMinutes}</h2>
          <h3 id="break-length">
            {" "}
            <span id="break-length">{this.state.breakMinutesDecrementing}</span>
            :
            {this.state.breakSecondsDecrementing < 10
              ? "0" + this.state.breakSecondsDecrementing
              : this.state.breakSecondsDecrementing}
          </h3>
        </div>
      </div>
    );
  }
}

export default Clock;

// set 8 value at once (four of each of session and break lengths), and run as a chain
// if seshvalue1 == 0 and breakvalue == 0 (both values depleted),
// run the function with seshvalue 2 and breakvalue2 as starting points

//           <button onClick={this.handlePause}>Pause</button>
