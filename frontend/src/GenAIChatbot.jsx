import { useState } from "react";

function GenAIChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am the Enterprise AI Assistant. Ask me about cloud resources, cost optimization, infrastructure, or multi-cloud strategy."
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResponse = (question) => {
    const text = question.toLowerCase();

    if (
      text.includes("cost") ||
      text.includes("price") ||
      text.includes("expensive")
    ) {
      return "For cost optimization, review unused resources, compare cloud pricing, and move suitable workloads to the most cost-efficient provider. The Cost Analysis module can help identify areas for optimization.";
    }

    if (
      text.includes("aws") ||
      text.includes("s3") ||
      text.includes("storage")
    ) {
      return "AWS S3 is currently available for real file storage operations in this project. You can upload, view, download, and delete files through the Storage module.";
    }

    if (
      text.includes("azure")
    ) {
      return "Azure is included as a multi-cloud provider in the orchestration architecture. Its current dashboard information is part of the provider management layer.";
    }

    if (
      text.includes("google") ||
      text.includes("gcp")
    ) {
      return "Google Cloud is included in the multi-cloud orchestration architecture. The platform can be extended with real Google Cloud APIs for production resource management.";
    }

    if (
      text.includes("resource") ||
      text.includes("server") ||
      text.includes("compute")
    ) {
      return "The Resources module provides a centralized view of cloud infrastructure across AWS, Azure, and Google Cloud. You can monitor resource type, status, region, and estimated cost.";
    }

    if (
      text.includes("security") ||
      text.includes("secure")
    ) {
      return "Security should include protected cloud credentials, least-privilege IAM permissions, encrypted communication, authentication, authorization, and secure environment variables.";
    }

    if (
      text.includes("monitor") ||
      text.includes("monitoring")
    ) {
      return "The Monitoring module provides infrastructure health information. A production implementation can connect cloud monitoring APIs for CPU, memory, storage, network, and service health metrics.";
    }

    if (
      text.includes("architecture") ||
      text.includes("how")
    ) {
      return "The platform uses a React frontend, FastAPI backend, cloud provider integrations, centralized resource management, AI analysis, and generative AI assistance.";
    }

    if (
      text.includes("hello") ||
      text.includes("hi")
    ) {
      return "Hello! How can I help you with your multi-cloud infrastructure?";
    }

    return "I can help you analyze cloud resources, infrastructure costs, storage, monitoring, security, and multi-cloud architecture. Try asking: 'How can I reduce cloud cost?'";
  };

  const sendMessage = () => {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: question
      }
    ]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      const answer = generateResponse(question);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: answer
        }
      ]);

      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const askQuestion = (question) => {
    setInput(question);

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          role: "user",
          text: question
        }
      ]);

      setLoading(true);

      setTimeout(() => {
        const answer = generateResponse(question);

        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            text: answer
          }
        ]);

        setLoading(false);
      }, 700);

      setInput("");
    }, 0);
  };

  return (
    <div className="genai-page">

      <div className="genai-header">
        <div>
          <h1>Generative AI Assistant</h1>
          <p>
            Intelligent assistant for multi-cloud infrastructure management.
          </p>
        </div>

        <div className="ai-status">
          <span></span>
          AI Assistant Online
        </div>
      </div>

      <div className="genai-layout">

        <div className="chat-container">

          <div className="chat-header">
            <div className="chat-avatar">
              ✦
            </div>

            <div>
              <h2>Enterprise AI Assistant</h2>
              <p>Multi-Cloud Intelligence</p>
            </div>
          </div>

          <div className="messages-area">

            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "message-row user-row"
                    : "message-row"
                }
              >

                {message.role === "assistant" && (
                  <div className="message-avatar">
                    AI
                  </div>
                )}

                <div
                  className={
                    message.role === "user"
                      ? "message user-message"
                      : "message assistant-message"
                  }
                >
                  {message.text}
                </div>

              </div>
            ))}

            {loading && (
              <div className="message-row">

                <div className="message-avatar">
                  AI
                </div>

                <div className="message assistant-message typing">
                  AI is analyzing...
                </div>

              </div>
            )}

          </div>

          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask about your cloud infrastructure..."
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>

        <div className="suggestions-panel">

          <h2>Quick Questions</h2>

          <p>
            Try asking the AI assistant:
          </p>

          <button
            onClick={() =>
              askQuestion(
                "How can I reduce cloud cost?"
              )
            }
          >
            💰 How can I reduce cloud cost?
          </button>

          <button
            onClick={() =>
              askQuestion(
                "What resources are available?"
              )
            }
          >
            ☁ What resources are available?
          </button>

          <button
            onClick={() =>
              askQuestion(
                "How does multi-cloud architecture work?"
              )
            }
          >
            🏗 How does multi-cloud architecture work?
          </button>

          <button
            onClick={() =>
              askQuestion(
                "How can I improve cloud security?"
              )
            }
          >
            🔒 How can I improve cloud security?
          </button>

          <button
            onClick={() =>
              askQuestion(
                "How does AWS S3 storage work?"
              )
            }
          >
            📦 How does AWS S3 storage work?
          </button>

          <div className="ai-info">

            <div className="ai-info-icon">
              ✦
            </div>

            <div>
              <h3>AI-Powered Orchestration</h3>

              <p>
                The assistant is designed to analyze
                infrastructure information and provide
                intelligent cloud management guidance.
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="genai-note">

        <strong>Project Architecture Note:</strong>

        <span>
          This interface is prepared for integration with
          a production Generative AI model through the
          FastAPI backend.
        </span>

      </div>

      <style>{`

        .genai-page {
          padding: 30px;
          color: #172033;
        }

        .genai-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
        }

        .genai-header h1 {
          margin: 0 0 7px;
          font-size: 30px;
        }

        .genai-header p {
          margin: 0;
          color: #6b7280;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 13px;
          border-radius: 20px;
          background: #ecfdf5;
          color: #047857;
          font-size: 12px;
          font-weight: 600;
        }

        .ai-status span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .genai-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 22px;
          max-width: 1250px;
        }

        .chat-container {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 15px;
          overflow: hidden;
          min-height: 620px;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 18px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .chat-avatar {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .chat-header h2 {
          margin: 0 0 4px;
          font-size: 16px;
        }

        .chat-header p {
          margin: 0;
          color: #6b7280;
          font-size: 12px;
        }

        .messages-area {
          flex: 1;
          padding: 25px;
          overflow-y: auto;
          min-height: 420px;
          max-height: 500px;
          background: #fafafa;
        }

        .message-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
        }

        .user-row {
          justify-content: flex-end;
        }

        .message-avatar {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 8px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
        }

        .message {
          max-width: 70%;
          padding: 12px 15px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .assistant-message {
          background: white;
          border: 1px solid #e5e7eb;
        }

        .user-message {
          background: #111827;
          color: white;
          border-radius: 12px;
        }

        .typing {
          color: #6b7280;
          font-style: italic;
        }

        .chat-input-area {
          display: flex;
          gap: 10px;
          padding: 15px;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .chat-input-area input {
          flex: 1;
          border: 1px solid #d1d5db;
          border-radius: 9px;
          padding: 12px 14px;
          outline: none;
          font-size: 13px;
        }

        .chat-input-area input:focus {
          border-color: #6b7280;
        }

        .chat-input-area button {
          border: none;
          border-radius: 9px;
          background: #111827;
          color: white;
          padding: 0 20px;
          font-weight: 600;
          cursor: pointer;
        }

        .suggestions-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 15px;
          padding: 20px;
          height: fit-content;
        }

        .suggestions-panel h2 {
          margin: 0 0 6px;
          font-size: 18px;
        }

        .suggestions-panel > p {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 12px;
        }

        .suggestions-panel > button {
          display: block;
          width: 100%;
          text-align: left;
          border: 1px solid #e5e7eb;
          background: white;
          padding: 12px;
          border-radius: 9px;
          margin-bottom: 10px;
          cursor: pointer;
          color: #374151;
          font-size: 12px;
        }

        .suggestions-panel > button:hover {
          background: #f9fafb;
        }

        .ai-info {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding: 14px;
          border-radius: 10px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .ai-info-icon {
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 8px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-info h3 {
          margin: 0 0 5px;
          font-size: 12px;
        }

        .ai-info p {
          margin: 0;
          color: #6b7280;
          font-size: 11px;
          line-height: 1.5;
        }

        .genai-note {
          max-width: 1250px;
          margin-top: 20px;
          padding: 15px 18px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          font-size: 12px;
          color: #6b7280;
        }

        .genai-note strong {
          color: #374151;
          margin-right: 5px;
        }

        @media (max-width: 900px) {

          .genai-layout {
            grid-template-columns: 1fr;
          }

          .suggestions-panel {
            order: 2;
          }

        }

        @media (max-width: 650px) {

          .genai-page {
            padding: 18px;
          }

          .genai-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .message {
            max-width: 85%;
          }

          .chat-input-area {
            flex-direction: column;
          }

          .chat-input-area button {
            padding: 12px;
          }

        }

      `}</style>

    </div>
  );
}

export default GenAIChatbot;