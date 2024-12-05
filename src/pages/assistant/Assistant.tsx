import React, {useEffect, useState} from 'react';
import Chat from "../../components/chat/Chat.tsx";
import Input from "../../components/input/Input.tsx";
import {useQuery} from "@tanstack/react-query";
import {MessageType} from "../../types/chatTypes.ts";
import axios from "axios";
import Header from "../../components/header/Header.tsx";

const fetchMessages = async (): Promise<MessageType[]> => {
    const response = axios.get('http://localhost:8080/v1/chats/d6dc5ad2-d723-4e09-a428-5668b87ae777/messages?page=0&size=100')
    return response.then(res => res.data).catch(() => []);
}

const Assistant: React.FC = () => {

    const [messages, setMessages] = useState<MessageType[]>([]);

    const {data} = useQuery({
        queryKey: ['messages'],
        queryFn: fetchMessages,
    })

    useEffect(() => {
        if (data !== undefined) {
            setMessages(data)
        }
    }, [data])

    const sendMessage = async (message: string): Promise<MessageType[]> => {
        const userMessage: MessageType = {
            uuid: crypto.randomUUID(),
            role: 'USER',
            content: message,
        };
        const assistantMessage: MessageType = {
            uuid: crypto.randomUUID(),
            role: 'ASSISTANT',
            content: '',
        };

        setMessages((prev) => [...prev, userMessage]);

        const response = await fetch('http://localhost:8080/v1/chats/d6dc5ad2-d723-4e09-a428-5668b87ae777/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({role: 'USER', content: message}),
        });

        const reader = response.body?.getReader();  // Accessing the stream reader
        const decoder = new TextDecoder();

        if (reader) {
            while (true) {
                const {done, value} = await reader.read();
                if (done) {
                    break;
                }
                const chunks = decoder.decode(value, {stream: true});
                const jsonStrings = chunks.split('\n');
                for (let i = 0; i < jsonStrings.length; i++) {
                    const jsonString = jsonStrings[i].trim();
                    if (jsonString) {
                        try {
                            const partialMessage: MessageType = JSON.parse(jsonString);
                            assistantMessage.content += partialMessage.content;
                            setMessages((prev) => {
                                const filterOutAssistantMsg = prev
                                    .filter(msg => msg.uuid !== assistantMessage.uuid)

                                return [...filterOutAssistantMsg, assistantMessage]
                            });
                        } catch (error) {
                            console.error('Error parsing JSON chunk:', error);
                        }
                    }
                }
            }
        }
    }

    const clearMessages = async () => {

        await fetch('http://localhost:8080/v1/chats/d6dc5ad2-d723-4e09-a428-5668b87ae777/messages', {
            method: 'DELETE'
        });

        setMessages([]);
    }

    return (
        <div className="flex flex-col grow-1" style={{height: '100vh'}}>
            <Header onClear={clearMessages}/>
            <Chat messages={messages} />
            <Input onSubmit={sendMessage} />
        </div>
    );
};

export default Assistant;