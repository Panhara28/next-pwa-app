import React, { FunctionComponent } from 'react';
import Head from 'next/head';

type Props = {
  title?: string
  pathname?: string
  description?: string 
  type?: string
  image?: string
}

const SEO: FunctionComponent<Props> = (props) => {
  return (
    <Head>
      <title>{(props.title ? props.title + " - " : "") + process.env.NEXT_PUBLIC_TITLE}</title>

      <meta property="og:url" content={process.env.NEXT_PUBLIC_URL + (props.pathname ? props.pathname : "")}/>
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_TITLE}/>
      <meta property="og:type" content={props.type ? props.type : "website"}/>
      <meta property="og:title" content={(props.title ? props.title + " - " : "") + process.env.NEXT_PUBLIC_TITLE}/>
      <meta property="og:description" content={props.description ? props.description : `Visit ${process.env.NEXT_PUBLIC_TITLE} for up-to-the-minute news, breaking news, and feature stories.`}/>
      <meta property="og:image" content={props.image ? props.image : "/assets/fallbackseo.jpg"}/>
    </Head>
  );
}

export default SEO;