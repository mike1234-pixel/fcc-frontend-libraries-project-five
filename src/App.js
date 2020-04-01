import React from "react";
import Clock from "./Clock.jsx";

function App() {
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <Clock />
    </div>
  );
}

export default App;
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
    ✔ bug - startBreakTimer running by itself on page load
    ✔ bug fixed - removed the bind for startBreakTimer from the constructor. Now works.
    13) add new state container called 'sequenceNumber' which tracks how many times handleStart has run, longerBreak runs when sequenceNumber is divisible by 4 (so on the fourth, eighth, twelth rounds etc) ✔
    14) at the top of handleStart increment sequenceNumber ✔
    15) where breakTimer is called add a control statement - if sequenceNumber % 4 === 0, run longerBreak, else run breakTimer
    
*/

/* Pseudocode 
Can't convert a number into an actual time as this is not a data type.
Logic:
Set time interval of 1000ms
Run a function that decrements the seconds then decrements the minutes when seconds reach 00
25:00
0) timer starts onclick ✔
↓
1) seconds number decrements every 1000ms from 59 ✔
↓
2) if seconds is 0 ✔
↓
3) minutes decrement, and seconds reset to 59 ✔
↓
4) until 00:00 (minutes and seconds are 0) ✔
↓
5) we start counting down from the break -- 05:00 ✔
↓
6) same decrementing process as above ✔
↓
7) until 00:00 (minutes and seconds are 0) ✔
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

// audio file from here: http://soundbible.com/2157-Text-Message-Alert-4.html
