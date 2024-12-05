import React from 'react';
import {MessageType} from "../../types/chatTypes.ts";
import Message from "../message/Message.tsx";

interface ChatProps {
    messages: MessageType[];
}

const Chat: React.FC<ChatProps> = (props: ChatProps) => {
    return (
        <div className="h-full overflow-y-scroll w-full p-2.5">
            <div className="flex flex-col gap-3 m-auto" style={{width: '1000px'}}>
                {
                    props.messages
                        .filter(msg => msg.role !== "SYSTEM")
                        .map((msg, i) => {
                            return (
                                <div className="flex w-full" key={i}>
                                    <Message key={msg.uuid} message={msg} />
                                </div>
                            )
                        })
                }
            </div>
            <div className="h-32 w-10" />
        </div>
    );
};

export default Chat;