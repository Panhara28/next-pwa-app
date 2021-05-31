import React from 'react';
import { Graph } from '../../generated/graph';
import AudioPlayer from '../player/audio/AudioPlayer';

const ArticleAudio = ({ article }: { article: Graph.Article}) => {
  if(!article.audio) return null;
  
  return (
    <div className="grid-article-audio">
      <AudioPlayer src={article.audio}/>
    </div>
  );
}

export default ArticleAudio;