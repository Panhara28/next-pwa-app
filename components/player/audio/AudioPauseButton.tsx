type Props = {
  handleClick: () => void
}

const AudioPauseButton = (props: React.PropsWithChildren<Props>) => {
  const { handleClick } = props;
  
  return (
    <button onClick={() => handleClick()}>
      <i className="fal fa-pause fa-fw fa-xl"></i>
    </button>
  );
}

export default AudioPauseButton;