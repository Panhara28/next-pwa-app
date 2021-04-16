import { useEffect, useRef } from "react";

type Props = {
  articleId: number 
  onReach: () => void
}

const ArticleTracker = (props: React.PropsWithChildren<Props>) => {
  let level: number = 0;
  let start: number = Date.now();
  let scrollPosition: number = 0;
  let scrollDirection: string = "down";
  let checkReachTop: boolean = true;
  let checkReachBackBottom: boolean = false;
  let navbarHeight: number = 0;
  const thresholdTop: number = 200;
  const thresholdBottom: number = 400;
  const containerRef = useRef<HTMLDivElement>();

  const onScroll = () => {
    if(containerRef.current) {
      const box = containerRef.current.getBoundingClientRect();

      // Detect scroll direction
      scrollDirection = scrollPosition <= window.scrollY ? "down" : "up";
      scrollPosition = window.scrollY;
      
      // Calculate scroll level
      const progress = (window.innerHeight - box.top) / box.height;
      level = Math.max(level, progress);

      // Calcuate reach top and reach back to bottom
      if(scrollDirection === "down") {
        if(checkReachTop && (box.top - navbarHeight - thresholdTop) <= 0) {
          props.onReach();
          checkReachTop = false;
        } 

        if(box.bottom <= 0) checkReachBackBottom = true;
      } else if(scrollDirection === "up") {
        if(checkReachBackBottom && (box.bottom + navbarHeight - thresholdBottom) >= 0) {
          props.onReach();
          checkReachBackBottom = false;
        } 

        if(box.top >= 0) checkReachTop = true;
      }
    }
  };

  const onUnload = () => {
    send({
      event: "unload",
      site_id: process.env.NEXT_PUBLIC_SITE_ID,
      article_id: props.articleId,
      time: Date.now() - start,
      scroll: getScrollLevel(level),
    });
  };

  const onVisibilityChange = () => {
    if(document.visibilityState === "hidden") {
      onUnload();
    } else {
      // Reset session timer and count new pageview
      // When user revisit the page
      start = Date.now();
      send({
        event: "pageview",
        site_id: process.env.NEXT_PUBLIC_SITE_ID,
        article_id: props.articleId
      });
    } 
  }

  const getScrollLevel = (level: number) => {
    if (level < 0.25) return 25;
    if (level < 0.5) return 50;
    if (level < 0.75) return 75;
    else return 100;
  }

  const send = (data) => {
    navigator.sendBeacon(
      '//analytics.khmerload.com/beacon/track',
      JSON.stringify(data)
    );
  }

  useEffect(() => {
    navbarHeight = document.querySelector('.navbar').clientHeight;

    send({
      event: "pageview",
      site_id: process.env.NEXT_PUBLIC_SITE_ID,
      article_id: props.articleId
    });

    window.document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      onUnload();
    }
  }, []);

  return (
    <div ref={containerRef} className="article-tracker">
      {props.children}
    </div>
  );
}

export default ArticleTracker;