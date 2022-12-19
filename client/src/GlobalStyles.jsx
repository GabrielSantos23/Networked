import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

::-webkit-scrollbar {
    display: none;
}

* {
    

   
    font-family: 'Poppins', sans-serif;
    }
html,body {
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.color};
}

`;
