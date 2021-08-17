import React from "react";
import ReactDOM from "react-dom";
import App from "./Routes/App/App";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const AppSizeFitter = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: 1024px;
    min-height: 768px;
    width: 100vw;
    height: 100vh;
    background: ${(props) => props.theme.blueGradient};
`;

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <AppSizeFitter>
            <App />
        </AppSizeFitter>
        <ToastContainer
            position="bottom-left"
            closeOnClick
            newestOnTop={true}
            pauseOnFocusLoss={false}
        />
        <GlobalStyles />
    </ThemeProvider>,
    document.getElementById("root")
);
