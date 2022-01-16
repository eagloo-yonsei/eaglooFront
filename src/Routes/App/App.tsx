import React from "react";
import AppProvider from "./AppProvider";
import AppContainer from "./AppContainer";

function App() {
    
    return (
        <AppProvider>
            <AppContainer />
        </AppProvider>
    );
}

export default App;
