import React, { FunctionComponent } from 'react';
import Head from 'next/head';

type Props = {
  title?: string
  pathname?: string
  canonical?: string
  description?: string 
  type?: string
  image?: string
}

const SEO: FunctionComponent<Props> = (props) => {
  const url = process.env.NEXT_PUBLIC_URL + (props.pathname || "");
  const canonical = process.env.NEXT_PUBLIC_URL + (props.canonical || "");
  const siteName = process.env.NEXT_PUBLIC_TITLE;
  const type = props.type || "website";
  const title = (props.title ? props.title + " - " : "") + process.env.NEXT_PUBLIC_TITLE;
  const description = props.description || `Visit ${process.env.NEXT_PUBLIC_TITLE} for up-to-the-minute news, breaking news, and feature stories.`;
  const image = props.image || process.env.NEXT_PUBLIC_URL + "/assets/fallbackseo.jpg";

  return (
    <Head>
      <title>{title}</title>

      {/* Metatag Data */}
      <meta charSet='utf-8'/>
      <meta name="Content-Type-Script" content="text/javascript"/>
      <meta name="Content-Type-Style" content="text/css"/>
      <meta name="description" content={description}/>	
      <meta name="referrer" content="always" />
      <link rel="canonical" href={canonical} key={"canonical"}/>

      {/* Facebook Meta */}
      <meta property="og:url" content={url} key={"fb-url"}/>
      <meta property="og:site_name" content={siteName} key={"fb-site-name"}/>
      <meta property="og:type" content={type} key={"fb-type"}/>
      <meta property="og:title" content={title} key={"fb-title"}/>
      <meta property="og:description" content={description} key={"fb-description"}/>
      <meta property="og:image" content={image} key={"fb-image"}/>

      {/* Twitter Meta */}
      <meta name="twitter:card" content="summary_large_image" key={"twitter-card"}/>
      <meta name="twitter:site" content={siteName} key={"twitter-site"}/>
      <meta name="twitter:title" content={title} key={"twitter-title"}/>
      <meta name="twitter:description" content={description} key={"twitter-description"}/>
      <meta name="twitter:image" content={image} key={"twitter-image"}/>
    </Head>
  );
}

export default SEO;