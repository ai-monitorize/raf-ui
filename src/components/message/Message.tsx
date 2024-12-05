import React from 'react';
import {MessageType} from "../../types/chatTypes.ts";
import './Message.scss';
import Avatar from "../avatar/Avatar.tsx";

interface MessageProps {
    message: MessageType
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {

    const messageContainerClasses = ["flex w-full"]
    let isAssistant = false;

    switch (props.message.role) {
        case "USER":
            messageContainerClasses.push("justify-end")
            break
        case "ASSISTANT":
            messageContainerClasses.push("justify-start")
            isAssistant = true
            break
    }

    return (
        <div className={messageContainerClasses.join(" ")}>
            {
                isAssistant && <Avatar src={'/llama.png'} />
            }
            <span className="message">
                {props.message.content}
            </span>
        </div>
    );
};

export default Message;