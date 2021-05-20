import Image from "next/image";
import { parsedImage } from './Image';

export const renderArticleParagraph = (block, key) => {
  return <p key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
}

export const renderArticleHeader = (block, key) => {
  if(block.data.level === 1) {
    return <h1 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  } else if (block.data.level === 2) {
    return <h2 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  } else if (block.data.level === 3) {
    return <h3 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  } else if (block.data.level === 4) {
    return <h4 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  } else if (block.data.level === 5) {
    return <h5 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  } else if (block.data.level === 6) {
    return <h6 key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
  }
}

export const renderArticleImage = (block, key) => {
  let src = block.data.file.url;

  // Prevent image component that don't have image url
  if(!src) return null;

  // Dont resize gif image
  const fileExt = block.data.file.url.split('.').pop();
  if(fileExt !== "gif") {
    src = parsedImage(block.data.file.url, block.data.file.width, block.data.file.height, 650);
  } 

  return (
    <figure key={key} className="article-content-image">
      <Image unoptimized={true} src={src} alt={src} width={block.data.file.width} height={block.data.file.height}/>
      { block.data.caption && <figcaption className="article-content-caption" dangerouslySetInnerHTML={{ __html: block.data.caption }}/> }
    </figure>
  );
}

export const renderArticleEmbed = (block, key) => {
  const data = block.data;
  const rawServices = ["instagram", "tiktok", "twitter", "dailymail", "bbc"];

  if(rawServices.indexOf(data.service) > -1) {
    return (
      <div key={key} className={"article-content-embed " + data.service}>
        <div dangerouslySetInnerHTML={{ __html: data.source }}></div>
        { data.caption && <span className="article-content-caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if (data.service === "youtube") {
    return (
      <div key={key} className={"article-content-embed " + data.service}>
        <div style={{ width: "100%", position: "relative", paddingBottom: ((data.height / data.width) * 100) + "%", height: "0px" }}>
          <iframe 
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allowFullScreen
            title={data.caption || "Untitled"}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder={0}
            width={data.width}
            height={data.height}
            src={data.embedUrl}
            />
        </div>
        { data.caption && <span className="article-content-caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if(data.service === "facebook_video") {
    return(
      <div key={key} className={"article-content-embed " + data.service}>
        <div className="fb-video" data-href={data.embedUrl}></div>
        { data.caption && <span className="article-content-caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if(data.service === "facebook_post") {
    return(
      <div key={key} className={"article-content-embed " + data.service}>
        <div className="fb-post" data-href={data.embedUrl}></div>
        { data.caption && <span className="article-content-caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  }
}

export const renderArticleListItem = (block, key) => {
  const li = block.data.items.map((text, inx) => {
    return <li key={inx} dangerouslySetInnerHTML={{ __html: text }}/>
  });

  if(block.data.style === "ordered") {
    return <ol key={key}>{li}</ol>;
  } else if(block.data.style === "unordered") {
    return <ul key={key}>{li}</ul>;
  }
}

export const renderArticleBlockQuote = (block, key) => {
  return (
    <figure key={key} className="article-content-blockquote">
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: block.data.text }}/>
      </blockquote>
      { block.data.caption && <figcaption className="article-content-blockquote-caption" dangerouslySetInnerHTML={{ __html: block.data.caption }}/> }
    </figure>
  );
}

export const renderArticleCode = (block, key) => {
  return(
    <pre className="article-content-code" key={key} style={{ height: block.data.height + "px" }}>
      <code>{block.data.code}</code>
    </pre>
  );
}

export const renderArticleSource = (block, key, translation = "Source") => {
  return (
    <p key={key}>
      <b>{translation}</b>៖ <a target="_blank" rel="noopener" href={block.data.sourceLink}>{block.data.sourceName}</a>
    </p>
  );
}