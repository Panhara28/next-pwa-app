import React from "react";
import { convertSecondToTime } from './../../../functions/date';

type Props = {
  curTime: number 
  duration: number 
  onTimeUpdate: () => void
}

const AudioBar = (props: React.PropsWithChildren<Props>) => {
  const { duration, curTime, onTimeUpdate } = props;
  const curPercentage = (curTime / duration) * 100;

  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const bar = document.querySelector(".bar__progress");
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }
  //https://codesandbox.io/s/5wwj02qy7k?file=/src/Bar.js:934-949
  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = eMove => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar__time">{convertSecondToTime(curTime)}</span>
      <div
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`
        }}
        onMouseDown={e => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar__time">{convertSecondToTime(duration)}</span>
    </div>
  );
}

export default AudioBar;