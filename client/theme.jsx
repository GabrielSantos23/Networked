import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
export const lightTheme = {
  body: '#F3F3F3',
  text: '#4E5D78',
  bol: '#a6ddf0',
  color: '#000',
  hrColor: '#cfcdcd',
  gray: '#0000007b',
  cardColor: ' rgb(255, 255, 255)',
  input: '#000',
  cardName: '#fff',
  hr: '#DCDFE4',
};
export const darkTheme = {
  body: '#212833',
  text: '#f1f1f1',
  bol: '#242d49',
  color: '#f3f3f3',
  hrColor: '#242c41',
  gray: '#f3f3f39b',
  cardColor: ' #191C21',
  input: '#fff',
  cardName: '#212833',
  hr: '#212833',
};
