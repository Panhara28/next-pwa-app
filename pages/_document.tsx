import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const title = "Shity"
    const description = `Visit for up-to-the-minute news, breaking news, and feature stories.`;
    const theme = "Hello world"
    const assetUrl = "/assets/keylatop"

    return (
      <Html>
        <Head>
          <meta name="google" content="notranslate"/>
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

          <link rel='apple-touch-icon' href={`${assetUrl}/logo-192x192.png`}/>
          <link rel="icon" href={`${assetUrl}/favicon.ico`}/>
          <link rel='manifest' href={`${assetUrl}/manifest.json`}/>
        

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