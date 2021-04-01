import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />

          {/* <!-- Font --> */}
          <link rel="stylesheet" href={`/css/style.${process.env.LOCALE}.css`} />

          {/* Theme Checking */}
          <script src="/js/theme.js"/>
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument