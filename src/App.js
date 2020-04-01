import React from "react";
import Clock from "./Clock.jsx";

function App() {
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <h2>How to use the clock:</h2>
      <p>
        The pomodoro technique is a time management method where you break your
        working or study time into 25 minute chunks.
      </p>
      <p>
        Traditionally you have a working session of 25 minutes, followed by a
        break of 5 minutes...
      </p>
      <p>Then, after your fourth session, you have a longer 20 minute break.</p>
      <p>
        This clock enables you to set your own session and break lengths and
        will sound an alert after each session or break is complete.
      </p>
      <p>
        Your fourth (longer) break will be four times as long as your specified
        break length.
      </p>
      <Clock />
    </div>
  );
}

export default App;

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
8) start decrementing from session length again ✔
↓
9) until 00:00, start decrementing from break length ✔
↓
10) until this sequence has happened four times ✔
↓
11) then decrement the long break, which will be the break length x 4  ✔
↓
12) start from step 1 again. ✔
*/

// audio file from here: http://soundbible.com/2157-Text-Message-Alert-4.html
