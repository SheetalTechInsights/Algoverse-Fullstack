import React from "react";
import ReactMarkdown from "react-markdown";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={isUser ? "message user-message" : "message bot-message"}>
      {isUser ? (
        <p>{message.text}</p>
      ) : (
        <ReactMarkdown>
          {message.text}
        </ReactMarkdown>
      )}
    </div>
  );
}

export default ChatMessage;