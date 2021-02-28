import React from 'react';
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        
        <div>Hello World</div>
      </Head>
    </div>
  )
}