"use client";

import { useChatStore, Message } from "@/store/chat";
import { useState, useRef, useEffect } from "react";

export default function ChatDrawer() {
  const { isOpen, messages, isLoading, open, close, addMessage, setLoading } = useChatStore();
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      if (data.message) {
        addMessage({ role: "assistant", content: data.message });
      } else {
        addMessage({ role: "assistant", content: "Désolé, j'ai rencontré une erreur." });
      }
    } catch (error) {
      console.error("Chat error:", error);
      addMessage({ role: "assistant", content: "Impossible de contacter l'assistant." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="chat-btn" onClick={open} aria-label="Ouvrir le chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Scrim */}
      <div className={`drawer-scrim chat-scrim${isOpen ? " open" : ""}`} onClick={close} />

      {/* Drawer */}
      <aside className={`drawer chat-drawer${isOpen ? " open" : ""}`}>
        <div className="drawer-head">
          <h3>
            <small>Assistant IA</small>
            Coco Bonbons
          </h3>
          <button className="drawer-close" onClick={close}>✕</button>
        </div>

        <div className="drawer-body chat-body" ref={bodyRef}>
          {messages.length === 0 && (
            <div className="chat-welcome">
              <p>Bonjour ! Je suis l&apos;assistant de Coco Bonbons. Comment puis-je vous aider ?</p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
              {msg.content}
            </div>
          ))}

          {isLoading && (
            <div className="chat-msg chat-msg-bot chat-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>

        <div className="drawer-foot chat-foot">
          <form onSubmit={handleSend} className="chat-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              disabled={isLoading}
            />
            <button type="submit" className="btn-send" disabled={isLoading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
