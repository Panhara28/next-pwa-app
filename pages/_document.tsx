import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const title = process.env.NEXT_PUBLIC_TITLE;
    const description = `Visit ${process.env.NEXT_PUBLIC_TITLE} for up-to-the-minute news, breaking news, and feature stories.`;
    const theme = process.env.NEXT_PUBLIC_COLOR_PRIMARY;
    const pwaAsset = process.env.PWA_ASSET;

    return (
      <Html>
        <Head>
          <meta name='application-name' content={title}/>
          <meta name='apple-mobile-web-app-capable' content='yes'/>
          <meta name='apple-mobile-web-app-status-bar-style' content='default'/>
          <meta name='apple-mobile-web-app-title' content={title}/>
          <meta name='description' content={description}/>
          <meta name='format-detection' content='telephone=no'/>
          <meta name='mobile-web-app-capable' content='yes'/>
          <meta name='msapplication-config' content='none'/>
          <meta name='msapplication-TileColor' content={theme}/>
          <meta name='msapplication-tap-highlight' content='no'/>
          <meta name='theme-color' content={theme}/>

          <link rel='apple-touch-icon' href={`${pwaAsset}/logo-192x192.png`}/>
          <link rel="icon" href={`${pwaAsset}/favicon.ico`}/>
          <link rel='manifest' href={`${pwaAsset}/manifest.json`}/>
          
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