import { useEffect, useRef, useState } from "react";
import { LoadingState } from "../assets/types";
import type { ProjectContext, Message } from "../assets/types";
import { checkCompliance, sendMessageToGemini } from "../services/genai/genaiService";
import { Menu, Send, ShieldCheck } from "lucide-react";
import ProjectSidebar from "../components/ProjectSidebar";
import ChatMessage from "../components/ChatMessage";
import { DEFAULT_PROJECT_CONTEXT } from "../assets/constants";

const AssistentPage = () => {
    // Start with a default context so chat and compliance checks always have data
    const [projectContext, setProjectContext] = useState<ProjectContext>(DEFAULT_PROJECT_CONTEXT);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'model',
            text: '**PBL Expert Assistent**\nJag är redo att granska ditt projekt mot PBL, BBR och gällande normer.\n\nJag ser att du projekterar en **' + DEFAULT_PROJECT_CONTEXT.constructionType.toLowerCase() + '** av typen **' + DEFAULT_PROJECT_CONTEXT.projectType.toLowerCase() + '**. \n\nAnvänd panelen till vänster för att uppdatera 3D-modellens parametrar, eller ställ en specifik fråga om lagkrav.',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || loadingState !== LoadingState.IDLE) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoadingState(LoadingState.LOADING);

        try {
            if (!projectContext) throw new Error("Project context is not set");

            const responseText = await sendMessageToGemini(input, projectContext);

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: 'Systemfel: Kunde inte nå lagdatabasen via AI-tjänsten.',
                timestamp: new Date(),
                isError: true,
            };
            setMessages(prev => [...prev, errorMsg]);
            console.error("Error sending message:", error);
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    };

    const handleRunComplianceCheck = async () => {
        if (loadingState !== LoadingState.IDLE) return;

        // On mobile, close sidebar to see result
        if (window.innerWidth < 768) setIsSidebarOpen(false);

        setLoadingState(LoadingState.ANALYZING);

        // Add a ghost message to indicate action
        const checkId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: checkId,
            role: 'user',
            text: 'Initierar fullständig regelkontroll (PBL/BBR)...',
            timestamp: new Date()
        }]);

        try {
            if (!projectContext) throw new Error("Project context is not set");

            const responseText = await checkCompliance(projectContext);

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: 'Kunde inte slutföra analysen.',
                timestamp: new Date(),
                isError: true
            }]);
            console.error("Error during compliance check:", error);
        } finally {
            setLoadingState(LoadingState.IDLE);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };



    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 overflow-hidden relative font-sans">

            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden absolute top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-slate-800/80 backdrop-blur rounded-md shadow-lg border border-slate-700 text-slate-100 hover:bg-slate-700 transition-all"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                {projectContext && <ProjectSidebar
                    context={projectContext}
                    onContextChange={setProjectContext}
                    onRunCheck={handleRunComplianceCheck}
                    isChecking={loadingState === LoadingState.ANALYZING}
                />}
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">

                {/* Header */}
                <header className="bg-slate-950/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 h-16 shadow-lg z-20">
                    <div className="flex items-center gap-3 ml-10 md:ml-0">
                        <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-lg shadow-purple-600/50">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">PBL EXPERT</h1>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">AI-stöd för Arkitekter & Ingenjörer</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/50 backdrop-blur px-3 py-1.5 rounded-full border border-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {projectContext && projectContext.municipality} • {projectContext && projectContext.projectType}
                    </div>
                </header>

                {/* Messages */}
                <main className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-8 bg-gradient-to-b from-slate-900/30 to-slate-950">
                    <div className="max-w-4xl mx-auto">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}

                        {loadingState === LoadingState.LOADING && (
                            <div className="flex justify-start mb-6">
                                <div className="flex max-w-[75%] gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mx-1" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/* Input Area */}
                <footer className="bg-slate-950/50 backdrop-blur-md border-t border-slate-800 p-4 shadow-2xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative flex items-end gap-2 bg-slate-900/50 border border-slate-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 focus-within:bg-slate-900 transition-all shadow-lg backdrop-blur">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Beskriv en designfråga eller be om lagstöd (t.ex. 'Vad gäller för räcken på balkong?')"
                                className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-2 text-sm text-slate-100 placeholder-slate-500 scrollbar-thin font-medium"
                                rows={1}
                                disabled={loadingState !== LoadingState.IDLE}
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!input.trim() || loadingState !== LoadingState.IDLE}
                                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all
                  ${!input.trim() || loadingState !== LoadingState.IDLE
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50'
                                    }`}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-center text-[10px] text-slate-500 mt-2 font-medium">
                            AI-genererad information. Kontrollera alltid mot Boverkets originaltexter och gällande detaljplan.
                        </p>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default AssistentPage