import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./Fonts/fonts.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
`;

export default GlobalStyles;
