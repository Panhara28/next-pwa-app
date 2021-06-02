import { useState, useEffect, useRef } from "react";
import AudioPauseButton from "./AudioPauseButton";
import AudioPlayButton from "./AudioPlayButton";
import AudioBar from "./AudioBar";
import { convertSecondToTime } from "../../../functions/date";
type Props = {
  src: string
}

const AudioPlayer = (props: React.PropsWithChildren<Props>) => {
  const audioRef = useRef<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [curTime, setCurTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const onTimeUpdate = () => setCurTime(audio.currentTime);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("loadeddata", onLoadedData);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.src = props.src;

    return () => {
      audio.removeEventListener("loadeddata", onLoadedData);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(0);
    }
  }, [audioRef, clickedTime]);

  return (
    <div className="player-audio">
      <audio ref={audioRef}>
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div className="player-audio-controls">
        <AudioBar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => {
            setClickedTime(time);
          }}
        />

        {playing ? (
          <AudioPauseButton
            handleClick={() => {
              audioRef.current.pause();
              setPlaying(false);
            }}
          />
        ) : (
          <AudioPlayButton
            handleClick={() =>
              audioRef.current.play().then(() => {
                setPlaying(true);
              })
            }
          />
        )}

        <div className="player-audio-time">
          <span>{convertSecondToTime(curTime)}</span>
          <span>{convertSecondToTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
