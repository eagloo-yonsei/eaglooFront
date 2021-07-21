import React from "react";
import { useAppContext } from "./AppProvider";
import {
    BrowserRouter,
    Switch,
    Route as Router,
    Redirect,
} from "react-router-dom";
import Header from "../../Components/Header";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import List from "../../Pages/List";
import Entry from "../../Pages/Entry";
import Room from "../../Pages/Room";
import Forum from "../../Pages/Forum";
import Feedback from "../../Pages/Feedback";
import About from "../../Pages/About";

function AppContainer() {
    const { isAdmin } = useAppContext();

    return (
        <BrowserRouter>
            {isAdmin ? <AdminRouter /> : <UserRouter />}
        </BrowserRouter>
    );
}

function UserRouter() {
    return (
        <>
            <Header />
            <Switch>
                <Router exact path={"/"} component={Home} />
                <Router path={"/login"} component={Login} />
                <Router path={"/list"} component={List} />
                <Router path={"/entry"} component={Entry} />
                <Router path={"/room"} component={Room} />
                <Router path={"/forum"} component={Forum} />
                <Router path={"/feedback"} component={Feedback} />
                <Router path={"/about"} component={About} />
                <Redirect to={"/"} from={"*"} />
            </Switch>
        </>
    );
}

function AdminRouter() {
    return <>Admin Page</>;
}

export default AppContainer;
