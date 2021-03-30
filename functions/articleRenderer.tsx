import Image from "next/image";
import { parsedImage } from './Image';

export function renderArticleParagraph(block, key) {
  return <p key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
}

export function renderArticleImage(block, key) {
  const url = parsedImage(block.data.file.url, block.data.file.width, block.data.file.height);

  return (
    <figure key={key} className="image">
      <Image src={url} alt={url} width={block.data.file.width} height={block.data.file.height}/>
      { block.data.caption && <figcaption className="caption" dangerouslySetInnerHTML={{ __html: block.data.caption }}/> }
    </figure>
  );
}

export function renderArticleEmbed(block, key) {
  const data = block.data;
  const raw_service = ["instagram", "tiktok", "twitter", "dailymail", "bbc"];

  if(raw_service.indexOf(data.service) > -1) {
    return (
      <div key={key} className={"embed " + data.service}>
        <div dangerouslySetInnerHTML={{ __html: data.source }}></div>
        { data.caption && <span className="caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if (data.service === "youtube") {
    return (
      <div key={key} className={"embed " + data.service}>
        <div style={{ width: "100%", position: "relative", paddingBottom: ((data.height / data.width) * 100) + "%", height: "0px" }}>
          <iframe 
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allowFullScreen
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder={0}
            width={data.width}
            height={data.height}
            src={data.embedUrl}
            ></iframe>
        </div>
        { data.caption && <span className="caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if(data.service === "facebook_video") {
    return(
      <div key={key} className={"embed " + data.service}>
        <div className="fb-video" data-lazy={true} data-href={data.embedUrl}></div>
        { data.caption && <span className="caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  } else if(data.service === "facebook_post") {
    return(
      <div key={key} className={"embed " + data.service}>
        <div className="fb-post" data-lazy={true} data-href={data.embedUrl}></div>
        { data.caption && <span className="caption" dangerouslySetInnerHTML={{ __html: data.caption }}/> }
      </div>
    );
  }

  return null;
}