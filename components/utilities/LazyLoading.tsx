import React, { useEffect, useRef, useState } from 'react';

const LazyLoading = (props: React.PropsWithChildren<{}>) => {
  const [ scrollReached, setScrollReached ] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>();
  let timeoutRef: NodeJS.Timeout;

  const checkUpdate = () => {
    if(containerRef.current) {
      const offset = containerRef.current.getBoundingClientRect().top - window.innerHeight;

      if(!scrollReached && Math.floor(offset) <= 0) {
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
    // Delay listening to the scroll event
    // To prevent double loading when page first load
    // and other above DOM hasn't finish loading
    timeoutRef = setTimeout(() => {
      // Add scroll event when component did mount
      window.addEventListener("scroll", onScroll);
      checkUpdate();
    }, 1000);
    

    // Remove scroll event when component unmount
    return () => {
      clearTimeout(timeoutRef);
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <>{ scrollReached ? props.children : <div className="lazy-loading" ref={containerRef}/>}</>
  );
}

export default LazyLoading;