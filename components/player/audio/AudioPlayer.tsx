import { useState, useEffect, useRef } from 'react';
import AudioPauseButton from './AudioPauseButton';
import AudioPlayButton from './AudioPlayButton';
import AudioBar from './AudioBar';
import { convertSecondToTime } from '../../../functions/date';

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
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(0);
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  }, [audioRef, playing, clickedTime]);

  return (
    <div className="player-audio">
      <audio ref={audioRef}>
        <source src={props.src}/>
        Your browser does not support the <code>audio</code> element.
      </audio>

      <div className="player-audio-controls">
        <AudioBar curTime={curTime} duration={duration} onTimeUpdate={(time) => {setClickedTime(time)}}/>

        {playing ? 
          <AudioPauseButton handleClick={() => setPlaying(false)}/> :
          <AudioPlayButton handleClick={() => setPlaying(true)}/>
        }

        <span className="player-audio-time">
          {convertSecondToTime(curTime)} <i className="fal fa-slash-forward"></i> {convertSecondToTime(duration)}
        </span>
      </div>
    </div>
  );
}

export default AudioPlayer;