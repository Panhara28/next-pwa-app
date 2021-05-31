type Props = {
  handleClick: () => void
}

const AudioPlayButton = (props: React.PropsWithChildren<Props>) => {
  const { handleClick } = props;
  
  return (
    <button className="player-audio-button" onClick={() => handleClick()}>
      <i className="fal fa-play fa-fw fa-xl"></i>
    </button>
  );
}

export default AudioPlayButton;