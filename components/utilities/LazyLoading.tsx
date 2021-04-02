import React, { useEffect, useRef, useState } from 'react';

const LazyLoading: React.FunctionComponent = (props) => {
  const [ scrollReached, setScrollReached ] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>();

  const checkUpdate = () => {
    if(containerRef.current) {
      const offset = containerRef.current.getBoundingClientRect().top - window.innerHeight;

      if(!scrollReached && offset <= 10) {
        // Render childrend when the scroll position is reached
        setScrollReached(true);
  
        // Remove scroll event when the scroll position is reached
        window.removeEventListener("scroll", onScroll);
      }
    }
  }

  const onScroll = () => {
    checkUpdate();
  }

  useEffect(() => {
    // Add scroll event when component did mount
    window.addEventListener("scroll", onScroll);
    checkUpdate();

    // Remove scroll event when component unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <div className="lazy-loading" ref={containerRef}>
      { scrollReached ? props.children : null }
    </div>
  );
}

export default LazyLoading;