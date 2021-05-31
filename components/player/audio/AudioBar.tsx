import React, { useRef } from "react";

type Props = {
  curTime: number 
  duration: number 
  onTimeUpdate: (time: number) => void
}

const AudioBar = (props: React.PropsWithChildren<Props>) => {
  const barRef = useRef<HTMLDivElement>();
  const { duration, curTime, onTimeUpdate } = props;
  const curPercentage = (curTime / duration) * 100 || 0;

  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const bar = barRef.current;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  const calcTouchedTime = (e) => {
    const touch =  e.touches[0]
    const clickPositionInPage = touch.pageX;
    const bar = barRef.current;
    const barStart = bar.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  }

  const handleMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: MouseEvent) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    }, { once: true });
  }

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    onTimeUpdate(calcTouchedTime(e));

    const updateTimeOnMove = (eMove: TouchEvent) => {
      onTimeUpdate(calcTouchedTime(eMove));
    };

    document.addEventListener("touchmove", updateTimeOnMove);

    document.addEventListener("touchend", () => {
      document.removeEventListener("touchmove", updateTimeOnMove);
    }, { once: true });
  }

  return (
    <div className="player-audio-bar">
      <div
        ref={barRef}
        className="player-audio-bar-progress"
        style={{
          background: `linear-gradient(to right, var(--color-secondary) ${curPercentage}%, var(--color-white) 0)`
        }}
        onMouseDown={e => handleMouse(e)}
        onTouchStart={e => handleTouch(e)}
      >
        <span
          className="player-audio-bar-progress-knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
    </div>
  );
}

export default AudioBar;