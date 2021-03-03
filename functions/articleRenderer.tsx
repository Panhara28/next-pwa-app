import Image from "next/image";
import { parsedImage } from './Image';

export function renderArticleParagraph(block, key) {
  return <p key={key} dangerouslySetInnerHTML={{ __html: block.data.text }}/>;
}

export function renderArticleImage(block, key) {
  const url = parsedImage(block.data.file.url);

  return (
    <figure key={key} className="image">
      <Image src={url} alt={url} width={block.data.file.width} height={block.data.file.height}/>
      <figcaption className="caption" dangerouslySetInnerHTML={{ __html: block.data.caption }}></figcaption>
    </figure>
  );
}