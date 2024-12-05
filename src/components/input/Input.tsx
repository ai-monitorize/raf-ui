import React, {useEffect, useRef, useState} from 'react';
import './Input.scss';
import {FaArrowUp} from "react-icons/fa";

interface InputProps {
    onSubmit: (value: string) => void;
}
const Input: React.FC<InputProps> = (props: InputProps) => {

    const [prompt, setPrompt] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        props.onSubmit(prompt);
        setPrompt('');
    };

    const handleEnterKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.shiftKey && event.key === 'Enter') {
            event.preventDefault();
            setPrompt((prev) => prev + '\n');
        } else if (event.key === 'Enter' && prompt.trim() !== '') {
            event.preventDefault();
            handleSubmit();
        }
    };

    const adjustTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // Reset height to calculate scrollHeight
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust height based on content
        }
    };

    useEffect(() => {
        adjustTextAreaHeight();
    }, [prompt]);

    return (
        <div className="container">
            <textarea
                rows={1}
                onKeyDown={handleEnterKey}
                onChange={(e) => setPrompt(e.target.value)}
                ref={textAreaRef}
                value={prompt}
                className="textarea"
                name="prompt"
                placeholder="Message assistant" />
            <div className="button">
                <FaArrowUp />
            </div>
        </div>
    );
};

export default Input;