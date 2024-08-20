import React, { useState } from "react";
import FarmEChatbot from "./FarmEChatbot";
import PDFRAGChatbot from "./PDFRAGChatbot";

const App = () => {
  const [currentChatbot, setCurrentChatbot] = useState("farmE");

  return (
    <div>
      <header>
        <button onClick={() => setCurrentChatbot("farmE")}>FarmE Chatbot</button>
        <button onClick={() => setCurrentChatbot("pdfRAG")}>PDF RAG Chatbot</button>
      </header>
      {currentChatbot === "farmE" && <FarmEChatbot />}
      {currentChatbot === "pdfRAG" && <PDFRAGChatbot />}
    </div>
  );
};

export default App;
