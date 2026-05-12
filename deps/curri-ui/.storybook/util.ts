import { createGlobalStyle } from 'styled-components'

const InterFont = {
  IBMPlexMono: {
    Bold: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Bold.ttf'),
    BoldItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-BoldItalic.ttf'),
    ExtraLight: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-ExtraLight.ttf'),
    ExtraLightItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-ExtraLightItalic.ttf'),
    Italic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Italic.ttf'),
    Light: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Light.ttf'),
    LightItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-LightItalic.ttf'),
    Medium: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Medium.ttf'),
    MediumItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-MediumItalic.ttf'),
    Regular: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Regular.ttf'),
    SemiBold: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-SemiBold.ttf'),
    SemiBoldItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-SemiBoldItalic.ttf'),
    Thin: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-Thin.ttf'),
    ThinItalic: require('../src/assets/fonts/IBMPlexMono/IBMPlexMono-ThinItalic.ttf'),
  },
  IBMPlexSans: {
    Bold: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Bold.ttf'),
    BoldItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-BoldItalic.ttf'),
    ExtraLight: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-ExtraLight.ttf'),
    ExtraLightItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-ExtraLightItalic.ttf'),
    Italic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Italic.ttf'),
    Light: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Light.ttf'),
    LightItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-LightItalic.ttf'),
    Medium: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf'),
    MediumItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-MediumItalic.ttf'),
    Regular: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf'),
    SemiBold: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-SemiBold.ttf'),
    SemiBoldItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-SemiBoldItalic.ttf'),
    Thin: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-Thin.ttf'),
    ThinItalic: require('../src/assets/fonts/IBMPlexSans/IBMPlexSans-ThinItalic.ttf'),
  },
  Inter: require(`../src/assets/fonts/Inter-VariableFont_slnt,wght.ttf`),
}

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url(${InterFont.Inter}) format('truetype');
    font-weight: 1 999;
  }

  // IBMPlexMono
  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.Thin}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.ThinItalic}) format('truetype');
    font-weight: 100;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.ExtraLight}) format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.ExtraLightItalic}) format('truetype');
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.Light}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.LightItalic}) format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.Regular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.Italic}) format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.Medium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.MediumItalic}) format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.SemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.SemiBoldItalic}) format('truetype');
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.SemiBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexMono';
    src: url(${InterFont.IBMPlexMono.SemiBoldItalic}) format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  // IBMPlexSans
  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.Thin}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.ThinItalic}) format('truetype');
    font-weight: 100;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.ExtraLight}) format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.ExtraLightItalic}) format('truetype');
    font-weight: 200;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.Light}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.LightItalic}) format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.Regular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.Italic}) format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.Medium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.MediumItalic}) format('truetype');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.SemiBold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.SemiBoldItalic}) format('truetype');
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.SemiBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBMPlexSans';
    src: url(${InterFont.IBMPlexSans.SemiBoldItalic}) format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  html {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
  }

  .sb-show-main.sb-main-padded,
  .sbdocs.sbdocs-wrapper {
    padding: 0;
  }

  .sbdocs.sbdocs-content {
    max-width: 100%;
  }
`
