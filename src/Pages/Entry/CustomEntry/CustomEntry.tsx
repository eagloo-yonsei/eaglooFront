import React from "react";
import CustomEntryProvider from "./CustomEntryProvider";
import CustomEntryContainer from "./CustomEntryContainer";

// TODO (enhancement)
// Public Entry 와 Custom Entry 가 공유하는 디자인 패턴이 많음.
// 적절히 합칠 수 있는 방식 고안
export default function CustomEntry() {
    return (
        <CustomEntryProvider>
            <CustomEntryContainer />
        </CustomEntryProvider>
    );
}
