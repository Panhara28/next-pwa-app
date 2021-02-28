import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}