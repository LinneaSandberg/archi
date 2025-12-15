import React from 'react';
import type { Message } from '../assets/types';
import { AlertCircle, Bot, User } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';

    const formatText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6 group`}>
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
          ${isUser ? 'bg-blue-600 text-white' : 'bg-slate-800 text-emerald-400'}`}>
                    {isUser ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className={`relative px-5 py-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap
            ${isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                        } ${message.isError ? 'border-red-300 bg-red-50 text-red-800' : ''}`}>

                        {message.isError && (
                            <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
                                <AlertCircle className="w-4 h-4" />
                                <span>Fel vid kommunikation</span>
                            </div>
                        )}

                        {formatText(message.text)}
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;