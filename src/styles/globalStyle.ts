import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @media(max-width: 1800px){
    html{
      font-size: 93.75%;
    }
  }
  @media(max-width: 720px){
    html{
      font-size: 87.5%;
    }
  }
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  :root{
    --white: #fff;

    --gray-50: #f7f8fa;
    --gray-100: #e6e8eb;
    --gray-200: #afb2b1;
    --gray-500: #808080;
    --gray-800: #494d4b;

    --green-500: #04D361;

    --purple-300: #9f75ff;
    --purple-400: #9164fa;
    --purple-500: #8257e5;
    --purple-800: #6f48c9;
  }
  body{
    background: var(----gray-50);
  }
  body, input, textarea, button{
    font-weight: 500;
    font: 500 1rem var(---gray-500);
    font-size: 1rem;
    font-family: Inter, sans-serif;
    color: var(----gray-500);
  }
  h1, h2, h3, h4, h5, h6{
    font-family: Lexend, sans-serif;
    color: var(---gray-800);
  }
  h1{
    font-size: 2rem; 
  }
  h2{
    font-size: 1.5rem; 
  }
  button{
    cursor: pointer;
  }
`