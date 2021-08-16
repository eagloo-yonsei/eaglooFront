import React from "react";
import ProfileProvider from "./ProfileProvider";
import ProfileContainer from "./ProfileContainer";

export default function Profile() {
    return (
        <ProfileProvider>
            <ProfileContainer />
        </ProfileProvider>
    );
}
