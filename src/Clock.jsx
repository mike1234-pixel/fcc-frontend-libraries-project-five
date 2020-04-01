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
      timerOn: false
    };
    this.incrementSessionMinutes = this.incrementSessionMinutes.bind(this);
    this.decrementSessionMinutes = this.decrementSessionMinutes.bind(this);
    this.incrementBreakMinutes = this.incrementBreakMinutes.bind(this);
    this.decrementBreakMinutes = this.decrementBreakMinutes.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  // start

  // he's setting a new var in the function as the timer, passing the value of sessionMins to it, using that new value in the function then throwing it away at the end
  // these two throwaway vars are now local vars, so how do i display them on the interface
  // pass the throwaway values to a different state, sessionMinutesDecrementing, and display them
  // pass the throwaway values to the new state values wherever the throwaway values are changed
  handleStart() {
    this.setState(() => {
      return {
        timerOn: true
      };
    });
    //declare throwaway vars
    let sessionMinutesTimer = this.state.sessionMinutes;
    let sessionSecondsTimer = this.state.sessionSeconds;

    if (this.state.timerOn !== true) {
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
            this.setState(() => {
              return {
                timerOn: false
              };
            });
            this.startBreakTimer();
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

  //break timer
  /*
  startBreakTimer() {
    this.setState(prevState => {
      return {
        breaktimerOn: true
      };
    });
    if (this.state.breakTimerOn !== true) {
      this.myInterval = setInterval(() => {
        const { breakSeconds, breakMinutes } = this.state;
        if (breakSeconds > 0) {
          this.setState(({ breakSeconds }) => ({
            breakSeconds: breakSeconds - 1
          }));
        }
        if (breakSeconds === 0) {
          if (breakMinutes === 0) {
            clearInterval(this.myInterval);
            const alertOne = new Audio(alert1);
            alertOne.play();
            this.setState(() => {
              return {
                breakTimerOn: false
              };
            });
            // run next function and play audio here - THIS IS WHERE I NEED TO RUN HANDLESTART AGAIN, something is preventing it running.
            // it should run because handlestart triggers this function in the same way
            this.handleStart();
          } else {
            this.setState(({ breakMinutes }) => ({
              breakMinutes: breakMinutes - 1,
              breakSeconds: 59
            }));
          }
        }
      }, 1000);
    }
  }
  */

  // reset

  handleReset() {
    this.setState(prevState => {
      return {
        sessionMinutes: 25,
        sessionMinutesDecrementing: 25,
        sessionSeconds: 0,
        sessionSecondsDecrementing: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        timerOn: false,
        breakTimerOn: false
      };
    });
    clearInterval(this.myInterval);
  }

  render() {
    return (
      <div>
        <div id="session-div">
          <h2 id="session-label">Session Length</h2>
          <button onClick={this.incrementSessionMinutes} id="session-increment">
            +
          </button>
          <button onClick={this.decrementSessionMinutes} id="session-decrement">
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
          <button onClick={this.handleStart} id="start_stop">
            Start
          </button>
          <button onClick={this.handleReset} id="reset">
            Reset
          </button>
        </div>
        <div id="break-div">
          <h2 id="break-label">Break Length</h2>
          <button onClick={this.incrementBreakMinutes} id="break-increment">
            +
          </button>
          <button onClick={this.decrementBreakMinutes} id="break-decrement">
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
