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
  return (
    <Head>
      <title>{(props.title ? props.title + " - " : "") + process.env.NEXT_PUBLIC_TITLE}</title>
      {/* Metatag Data */}
      <meta charSet='utf-8'/>
      <meta name="Content-Type-Script" content="text/javascript" />
      <meta name="Content-Type-Style" content="text/css" />
      <meta 
        name="description" 
        content={props.description ? props.description : `Visit ${process.env.NEXT_PUBLIC_TITLE} for up-to-the-minute news, breaking news, and feature stories.`}
      />	
      <meta name="referrer" content="always" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_URL + (props.canonical ? props.canonical : "")} key={"canonical"}/>

      {/* Facebook Meta */}
      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + (props.pathname ? props.pathname : "")} key={"fb-url"}/>
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_TITLE} key={"fb-site-name"}/>
      <meta property="og:type" content={props.type ? props.type : "website"} key={"fb-type"}/>
      <meta property="og:title" content={(props.title ? props.title + " - " : "") + process.env.NEXT_PUBLIC_TITLE} key={"fb-title"}/>
      <meta 
        property="og:description" 
        content={props.description ? props.description : `Visit ${process.env.NEXT_PUBLIC_TITLE} for up-to-the-minute news, breaking news, and feature stories.`} 
        key={"fb-description"}
      />
      <meta property="og:image" content={props.image ? props.image : "/assets/fallbackseo.jpg"} key={"fb-image"}/>
    </Head>
  );
}

export default SEO;