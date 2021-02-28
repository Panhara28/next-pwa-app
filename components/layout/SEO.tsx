import React, { FunctionComponent } from 'react';
import Head from 'next/head';

type Props = {
  title?: string
}

const SEO: FunctionComponent<Props> = (props) => {
  return (
    <Head>
      <title>{process.env.NEXT_PUBLIC_TITLE + (props.title ? " | " + props.title : "")}</title>
    </Head>
  );
}

export default SEO;