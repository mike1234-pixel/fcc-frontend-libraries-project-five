import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div className="how-to">
        <input
          type="checkbox"
          className="how-to__checkbox"
          id="how-to-toggle"
        />
        <label for="how-to-toggle" className="how-to__button">
          <span className="how-to__icon">&nbsp;</span>
        </label>
        <div className="how-to__background">&nbsp;</div>
        <div className="how-to__nav">
          <div className="how-to__text-container">
            <h2 className="how-to__header">How to use the clock:</h2>
            <p className="how-to__text">
              The pomodoro technique is a time management method where you break
              your working or study time into 25 minute chunks.
            </p>
            <p className="how-to__text">
              Traditionally you have a working session of 25 minutes, followed
              by a break of 5 minutes...
            </p>
            <p className="how-to__text">
              Then, after your fourth session, you have a longer 20 minute
              break.
            </p>
            <p className="how-to__text">
              This clock enables you to set your own session and break lengths
              and will sound an alert after each session or break is complete.
            </p>
            <p className="how-to__text">
              Your fourth (longer) break will be four times as long as your
              specified break length.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
