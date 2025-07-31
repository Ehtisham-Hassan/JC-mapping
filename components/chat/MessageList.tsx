import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import WelcomeScreen from './WelcomeScreen';

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (messages.length === 0) {
        return <WelcomeScreen />;
    }

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide flex justify-center" style={{ paddingBottom: '120px' }}>
            <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4">
                        <div className="text-sm font-medium mb-1 text-gray-800 dark:text-white">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                        </div>
                        <div className="text-gray-800 dark:text-gray-200">{message.content}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
