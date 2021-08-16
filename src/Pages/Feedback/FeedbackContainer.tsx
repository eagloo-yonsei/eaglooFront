import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../Routes/App/AppProvider";
import { useFeedbackContext } from "./FeedbackProvider";
import { FeedbackCategory } from "../../Constants";
import {
    SlideUpPageContainer,
    SelectorStyle,
    SubmitButton,
} from "../../Styles/StyledComponents";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function FeedbackContainer() {
    const { userInfo } = useAppContext();
    const {
        category,
        feedbackInput,
        submitting,
        setCategory,
        setFeedbackInput,
        submitFeedback,
        feedbackInputRef,
    } = useFeedbackContext();
    const selectorStyle = SelectorStyle();

    if (!userInfo) {
        return <Container>{`로그인 이후 이용할 수 있습니다.`}</Container>;
    }

    return (
        <Container>
            <Header>
                <Title>{`피드백 남기기`}</Title>
                <CategorySelector>
                    <CategoryReminder>
                        {`어떤 종류의 의견인가요?`}
                    </CategoryReminder>
                    <FormControl className={selectorStyle.formControl}>
                        <Select
                            native
                            value={category}
                            onChange={(e) => {
                                const value = e.target
                                    .value as FeedbackCategory;
                                setCategory(value);
                            }}
                            inputProps={{
                                name: "category",
                                id: "feedbackCategorySelect",
                            }}
                        >
                            <option
                                value={FeedbackCategory.GENERAL}
                            >{`일반`}</option>
                            <option
                                value={FeedbackCategory.BUG}
                            >{`버그 신고`}</option>
                            <option
                                value={FeedbackCategory.SUGGESTION}
                            >{`기능 제안`}</option>
                            <option
                                value={FeedbackCategory.ENHANCEMENT}
                            >{`개선점 건의`}</option>
                        </Select>
                    </FormControl>
                </CategorySelector>
            </Header>
            <ContentInput
                ref={feedbackInputRef}
                disabled={submitting}
                spellCheck="false"
                value={feedbackInput}
                placeholder="이글루에게 전하고 싶은 의견이 있나요?&#13;&#10;우측 상단에서 범주를 선택한 후 의견을 전해주세요!"
                onChange={(e) => {
                    if (e.target.value.length <= 2000) {
                        setFeedbackInput(e.target.value);
                    }
                }}
            />
            <Footer>
                <SubmitButton
                    buttonContent={`피드백 제출`}
                    loadingStatus={submitting}
                    submitFunction={submitFeedback}
                    disabledCondition={feedbackInput.length === 0}
                    width={`120px`}
                    fontSize={`16px`}
                />
            </Footer>
        </Container>
    );
}

const Container = styled(SlideUpPageContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    font-family: ${(props) => props.theme.subLabelFont};
    padding: 80px 120px 60px 120px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
`;

const Footer = styled(Header)`
    justify-content: flex-end;
`;

const Title = styled.div`
    font-size: 30px;
    font-family: ${(props) => props.theme.iconFont};
`;

const CategoryReminder = styled.div`
    color: gray;
    font-size: 15px;
    font-family: ${(props) => props.theme.inButtonFont};
`;

const CategorySelector = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    gap: 18px;
`;

const ContentInput = styled.textarea`
    width: 100%;
    height: calc(100% - 100px);
    padding: 24px;
    font-size: 21px;
    font-family: ${(props) => props.theme.subLabelFont};
    line-height: 32px;
    border: none;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    border-radius: 10px;
    resize: none;
    margin: 35px 0px;
    :focus {
        outline: none;
    }
`;
