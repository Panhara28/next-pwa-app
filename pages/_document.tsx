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
    const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

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

          {/* <!-- IOS Splash Screen --> */}
          <link href={`${assetUrl}/splashscreens/iphone5_splash.png`} media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/iphone6_splash.png`} media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/iphoneplus_splash.png`} media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/iphonex_splash.png`} media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/iphonexr_splash.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/iphonexsmax_splash.png`} media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/ipad_splash.png`} media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/ipadpro1_splash.png`} media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/ipadpro3_splash.png`} media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          <link href={`${assetUrl}/splashscreens/ipadpro2_splash.png`} media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image"/>
          
          {/* <!-- Font --> */}
          <link rel="preload stylesheet" href={`/css/style.${process.env.LOCALE}.css`} as="style"/>

          {/* <!-- Theme Checking --> */}
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