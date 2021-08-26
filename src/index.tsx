import React from "react";
import ReactDOM from "react-dom";
import App from "./Routes/App/App";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import GlobalStyles from "./Styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <App />
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
