import { useEffect, useRef } from "react";

const ArticleTracker = (props: React.PropsWithChildren<{ articleID }>) => {
  let level: number = 0;
  let start: number = Date.now();
  const containerRef = useRef<HTMLDivElement>();

  const onScroll = () => {
    if(containerRef.current) {
      const box = containerRef.current.getBoundingClientRect();
      const progress = (document.documentElement.clientHeight - box.top) / box.height;
      level = Math.max(level, progress);
    }
  };

  const onUnload = () => {
    send({
      event: "unload",
      site_id: process.env.NEXT_PUBLIC_SITE_ID,
      article_id: props.articleID,
      time: Date.now() - start,
      scroll: getScrollLevel(level),
    });
  };

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
    send({
      event: "pageview",
      site_id: process.env.NEXT_PUBLIC_SITE_ID,
      article_id: props.articleID
    });

    // Because unload event is extremely unreliable, especially on mobile
    // Ref: https://developers.google.com/web/updates/2018/07/page-lifecycle-api?utm_source=lighthouse&utm_medium=devtools#the-unload-event
    const terminationEvent = 'onpagehide' in self ? 'pagehide' : 'unload';
    window.addEventListener(terminationEvent, onUnload);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener(terminationEvent, onUnload);
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