import React from "react";
import { useAppContext } from "./AppProvider";
import {
    BrowserRouter,
    Switch,
    Route as Router,
    Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import Profile from "../../Pages/Profile";
import List from "../../Pages/List";
import Entry from "../../Pages/Entry";
import Room from "../../Pages/Room";
import Lounge from "../../Pages/Lounge";
import Forum from "../../Pages/Forum";
import Feedback from "../../Pages/Feedback";
import About from "../../Pages/About";
import SchedulerOpenButton from "../../Components/Scheduler/Scheduler__OpenButton";
import Scheduler from "../../Components/Scheduler";

import { AdminRouterContainer } from "../../Styles/StyledComponents";
import AdminHeader from "../../Admin/Admin__Header";
import AdminHome from "../../Admin/Admin__Home";
import AdminUser from "../../Admin/Admin__User";
import AdminRoom from "../../Admin/Admin__Room";
import AdminFeedback from "../../Admin/Admin__Feedback";

function AppContainer() {
    const { userInfo } = useAppContext();

    return (
        <BrowserRouter>
            <Container>
                {userInfo?.isAdmin ? <AdminRouter /> : <UserRouter />}
            </Container>
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
                <Router path={"/signup"} component={Signup} />
                <Router path={"/profile"} component={Profile} />
                <Router path={"/list"} component={List} />
                <Router path={"/entry"} component={Entry} />
                <Router path={"/room"} component={Room} />
                {/* <Router path={"/lounge"} component={Lounge} /> */}
                <Router path={"/forum"} component={Forum} />
                <Router path={"/feedback"} component={Feedback} />
                <Router path={"/about"} component={About} />
                <Redirect to={"/"} from={"*"} />
            </Switch>
            <Scheduler />
            <SchedulerOpenButton />
        </>
    );
}

function AdminRouter() {
    return (
        <>
            <AdminHeader />
            <AdminRouterContainer>
                <Switch>
                    <Router exact path={"/"} component={AdminHome} />
                    <Router path={"/user"} component={AdminUser} />
                    <Router path={"/room"} component={AdminRoom} />
                    <Router path={"/feedback"} component={AdminFeedback} />
                    <Redirect to={"/"} from={"*"} />
                </Switch>
            </AdminRouterContainer>
        </>
    );
}

const Container = styled.div`
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

export default AppContainer;
