import React, { useState } from "react";
import FarmEChatbot from "./FarmEChatbot";
import PDFRAGChatbot from "./PDFRAGChatbot";

const App = () => {
  const [currentChatbot, setCurrentChatbot] = useState("farmE");

  return (
    <div>
      <header>
        <button className="custom-btn" style={{backgroundColor: "#cbe4ff", marginRight: 5}} onClick={() => setCurrentChatbot("farmE")}>FarmE Chatbot</button>
        <button className="custom-btn" style={{backgroundColor: "#cbe4ff"}} onClick={() => setCurrentChatbot("pdfRAG")}>PDF RAG Chatbot</button>
      </header>
      {currentChatbot === "farmE" && <FarmEChatbot />}
      {currentChatbot === "pdfRAG" && <PDFRAGChatbot />}
    </div>
  );
};

export default App;
