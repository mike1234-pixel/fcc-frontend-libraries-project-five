import React, { Component } from "react";
import alert1 from "./AudioFiles/alert1.mp3";

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      sessionMinutes: 25,
      sessionSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      timerOn: false
    };
    this.incrementSessionMinutes = this.incrementSessionMinutes.bind(this);
    this.decrementSessionMinutes = this.decrementSessionMinutes.bind(this);
    this.incrementBreakMinutes = this.incrementBreakMinutes.bind(this);
    this.decrementBreakMinutes = this.decrementBreakMinutes.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  // click handlers for session minutes (increment and decrement)
  incrementSessionMinutes() {
    this.setState(prevState => {
      return {
        sessionMinutes: prevState.sessionMinutes + 1
      };
    });
  }

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

  handleStart() {
    this.setState(prevState => {
      return {
        timerOn: true
      };
    });
    if (this.state.timerOn !== true) {
      this.myInterval = setInterval(() => {
        const { sessionSeconds, sessionMinutes } = this.state;
        if (sessionSeconds > 0) {
          this.setState(({ sessionSeconds }) => ({
            sessionSeconds: sessionSeconds - 1
          }));
        }
        if (sessionSeconds === 0) {
          if (sessionMinutes === 0) {
            clearInterval(this.myInterval);
            const alertOne = new Audio(alert1);
            alertOne.play();
            // run next function and play audio here
          } else {
            this.setState(({ sessionMinutes }) => ({
              sessionMinutes: sessionMinutes - 1,
              sessionSeconds: 59
            }));
          }
        }
      }, 1000);
    }
  }

  // pause

  handlePause() {
    this.setState(prevState => {
      return {
        timerOn: false
      };
    });
    clearInterval(this.myInterval);
  }

  // reset

  handleReset() {
    this.setState(prevState => {
      return {
        sessionMinutes: 25,
        sessionSeconds: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        timerOn: false
      };
    });
    clearInterval(this.myInterval);
  }

  //break timer
  ///

  render() {
    return (
      <div>
        <div id="session-length">
          <h2>Session Length</h2>
          <button onClick={this.incrementSessionMinutes}>+</button>
          <button onClick={this.decrementSessionMinutes}>-</button>
        </div>
        <div id="clock">
          <h1>
            {this.state.sessionMinutes}:
            {this.state.sessionSeconds < 10
              ? "0" + this.state.sessionSeconds
              : this.state.sessionSeconds}
          </h1>
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handlePause}>Pause</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <div id="break-length">
          <h2>Break Length</h2>
          <h3>
            {" "}
            {this.state.breakMinutes}:
            {this.state.breakSeconds < 10
              ? "0" + this.state.breakSeconds
              : this.state.breakSeconds}
          </h3>
          <button onClick={this.incrementBreakMinutes}>+</button>
          <button onClick={this.decrementBreakMinutes}>-</button>
        </div>
      </div>
    );
  }
}

export default Clock;

/* Code:
    1) set the default state of session minutes and seconds as 25:00 and break session and minutes as 05:00 ✔
    ✔ create click handlers
    2) write a increment function for session and bind it ✔
    3) write a decrement function for session and bind it ✔
    4) write a increment function for break and bind it ✔
    5) write a decrement function for break and bind it ✔
    ✔ create and display countdown timer
    6) create countdown timer function which starts onclick of start button ✔
    7) in the render, when seconds is less than 10, add '0' before seconds, else just display seconds. this gives 0:00 format for seconds. ✔
    ✔ create onclick to pause and reset functions
    8) create onclick pause handler ✔
    9) create onclick reset handler - resets state to original and clearInterval method stops it automatically counting down again ✔
    ✔ bug - all works fine unless you click start again by mistake - then pause doesn't work, and the countdown speeds up??
    ✔ bug fixed - added state property 'timerOn' to toggle true/ false. handleStart sets to true, handlePause sets to false
    ✔ handleStart only runs the countdown when timerOn is false
    ✔ false means it's not already running, when it is already running (true) we don't want the countdown to try to execute.
    10) add ternaries to decrementSessionMinutes and decrementBreakMinutes to stop user decrementing these to less than 1 minute. ✔
    11) play audio file when timer hits 00:00 ✔
    12) run a function in the same place as the audio which starts the break timer
    

*/

/* Pseudocode 
Can't convert a number into an actual time as this is not a data type.
Logic:

Set time interval of 1000ms
Run a function that decrements the seconds then decrements the minutes when seconds reach 00
25:00

0) timer starts onclick
↓
1) seconds number decrements every 1000ms from 59
↓
2) if seconds is 0
↓
3) minutes decrement, and seconds reset to 59
↓
4) until 00:00 (minutes and seconds are 0)
↓
5) we start counting down from the break -- 05:00
↓
6) same decrementing process as above
↓
7) until 00:00 (minutes and seconds are 0)
↓
8) start decrementing from session length again
↓
9) until 00:00, start decrementing from break length
↓
10) until this sequence has happened four times
↓
11) then decrement the long break, which will be the break length x 4 
↓
12) start from step 1 again.
*/
