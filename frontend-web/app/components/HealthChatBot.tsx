"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function HealthChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/health-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply || "Sorry, I couldn't process that." },
      ]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Error connecting to AI." }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto scroll on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Header */}
      <div className="flex-none px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold text-xl shadow-md">
        Health Assistant
      </div>

      {/* Chat container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20 text-lg">
            Ask your health questions...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[70%] px-5 py-3 rounded-2xl shadow-md
                ${msg.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }
              `}
            >
              {msg.content}
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="animate-pulse px-5 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-400 shadow-md">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex-none px-6 py-4 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center gap-3 sticky bottom-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your question..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-gray-100 transition"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white disabled:opacity-60 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
