import React from "react";

interface MessageBoxProp {
    message: string;
}

interface LineProp {
    line: string;
}

export function MessageBox({ message }: MessageBoxProp) {
    return (
        <span>
            {message.split("\n").map((line) => (
                <MessageLine line={line} />
            ))}
        </span>
    );
}

function MessageLine({ line }: LineProp) {
    return (
        <>
            <br />
            {line}
        </>
    );
}
