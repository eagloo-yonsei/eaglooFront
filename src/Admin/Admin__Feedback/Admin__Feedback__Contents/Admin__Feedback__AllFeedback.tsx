import React from "react";
import styled from "styled-components";
import { useAdminFeedbackContext } from "../Admin__FeedbackProvider";
import { Feedback, FeedbackCategory } from "../../../Constants";

export default function AdminFeedbackAllFeedback() {
    const { allFeedback } = useAdminFeedbackContext();

    return (
        <>
            <FeedbackDataHeader />
            {allFeedback.map((feedbackInfo, index) => {
                return (
                    <FeedbackDataRow
                        key={feedbackInfo.id}
                        index={index}
                        feedbackInfo={feedbackInfo}
                    />
                );
            })}
        </>
    );
}

function FeedbackDataHeader() {
    return (
        <HeaderRowContainer>
            <Index>{`순번`}</Index>
            <Email>{`이메일`}</Email>
            <Category>{`분류`}</Category>
            <Content>{`내용`}</Content>
        </HeaderRowContainer>
    );
}

function FeedbackDataRow({
    index,
    feedbackInfo,
}: {
    index: number;
    feedbackInfo: Feedback;
}) {
    return (
        <RowContainer>
            <Index>{`${index + 1}`}</Index>
            <Email>{`${feedbackInfo.user}`}</Email>
            <Category>{`${categoryConvert(feedbackInfo.category)}`}</Category>
            <Content>{`${feedbackInfo.content}`}</Content>
        </RowContainer>
    );
}

function categoryConvert(category: FeedbackCategory) {
    switch (category) {
        case FeedbackCategory.GENERAL:
            return "일반";
        case FeedbackCategory.BUG:
            return "버그 신고";
        case FeedbackCategory.SUGGESTION:
            return "기능 제안";
        case FeedbackCategory.ENHANCEMENT:
            return "개선점 건의";
        default:
            return "일반";
    }
}

const HeaderRowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    font-size: 18px;
    font-family: ${(props) => props.theme.plainBoldTextFont};
`;

const RowContainer = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    font-size: 15px;
    font-family: ${(props) => props.theme.plainTextFont};
`;

const RowBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 100%;
    padding: 0px 12px;
    border-right: 2px solid gray;
`;

const Index = styled(RowBox)`
    width: 10%;
`;

const Email = styled(RowBox)`
    width: 15%;
`;

const Category = styled(RowBox)`
    width: 15%;
`;

const Content = styled(RowBox)`
    width: 50%;
    border: none;
`;
