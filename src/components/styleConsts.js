import { injectGlobal } from 'styled-components';

export const colors = {
  lightGraphite: '#808080',
  mauiOrange: '#ffaa00',
  graphite: '#404040',
  darkGraphite: '#101010',
  brightGraphite: '#999999',
  errorRed: '#ff5800',
  blueHydrangea: '#4097ff',
  darkBlueHydrangea: '#0063db',
};

export const screenBreaks = {
  small: '26em',
  medium: '40em',
  large: '64em',
  xlarge: '90em',
  xxlarge: '120em',
};

export const globalStyle = () => injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:300,400');
@import url('/assets/css/normalize.css');

body {
  font-family: 'Lato', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem;
}

a {
  :link{
    color: ${colors.blueHydrangea};
    text-decoration: none;
    border-bottom: 0.0625rem solid;
  }

  :visited {
    color: ${colors.blueHydrangea};
  }

  :hover {
    color: ${colors.darkBlueHydrangea};
  }
}
`;
