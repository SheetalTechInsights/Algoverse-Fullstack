import React, { useState } from "react";
import "./Chatbot.css";
import ChatMessage from "./ChatMessage";
import { getAIResponse } from "../../api/ai";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! Ask me any DSA question." }
  ]);

  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Add typing indicator
    setMessages(prev => [...prev, { sender: "bot", text: "Typing..." }]);

    try {
      const reply = await getAIResponse(input);

      // Replace "Typing..." with actual response
      setMessages(prev =>
        prev.slice(0, -1).concat({ sender: "bot", text: reply })
      );

    } catch (error) {
      setMessages(prev =>
        prev.slice(0, -1).concat({
          sender: "bot",
          text: "❌ Error getting response. Please try again."
        })
      );
    }
  };

  return (
    <>
      <div className="chat-toggle" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-header">
            🤖 AlgoVerse AI Assistant
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask a DSA question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;