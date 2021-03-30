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