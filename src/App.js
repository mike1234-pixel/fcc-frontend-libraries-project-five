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

/* BASIC APP LOGIC */
// user can set their own time and their own breaks - increment and decrement buttons for both break length and session length
// with the defaults set to 25min and 5 min
// beeps at start of break -- **add last**
// beeps at end of break (use two different audio files for these breaks) -- ** add last**
// state should keep track of the number of cycles
// once state is at 4 cycles of 25 mins, next break should be 20 mins long. So this long break should be 4x as long as whatever the user set their custom break time to.
// Reset state and start cycle over again

/* COMPONENTS */
// Incrementer/decrementer for session length
// Incrementer/decrementer for break length
// Clock component
// Start Button
// Pause Button
// Reset Button
