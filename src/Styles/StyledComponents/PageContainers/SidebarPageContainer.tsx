import React, { useState } from "react";
import styled from "styled-components";

export function SidebarPageContainer({
    contentTitles,
    contents,
}: {
    contentTitles: string[];
    contents: JSX.Element[];
}) {
    const [selectedContent, setSelectedContent] = useState<number>(0);

    return (
        <Container>
            <SidebarContainer>
                {contentTitles.map((contentTitle, index) => {
                    return (
                        <SidebarButton
                            key={`${index}th_${contentTitle}`}
                            selected={index === selectedContent}
                            onClick={() => {
                                setSelectedContent(index);
                            }}
                        >
                            {`${contentTitle}`}
                        </SidebarButton>
                    );
                })}
            </SidebarContainer>
            <ContentContainer>
                <ContentInnerContainer>
                    {contents[selectedContent]}
                </ContentInnerContainer>
            </ContentContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20%;
    height: 100%;
`;

const SidebarButton = styled.div<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    color: white;
    font-size: 20px;
    font-family: ${(props) => props.theme.subLabelFont};
    border: 2px solid ${(props) => (props.selected ? "white" : "none")};
    border-radius: 8px;
    cursor: pointer;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
`;

const ContentInnerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 95%;
    height: 95%;
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    overflow-y: auto;
`;
