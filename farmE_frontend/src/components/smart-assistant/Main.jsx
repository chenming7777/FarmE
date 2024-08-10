import "./Main.css";
import { assets } from "../../assets/smart-assistant/assets";
import React, { useEffect, useRef, useState } from "react";

const SmartAssistantMain = () => {
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [fileNames, setFileNames] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setShowChat(
      messages.length > 0 || fileNames.length > 0 || imageFiles.length > 0
    );
  }, [messages, fileNames, imageFiles]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageClick2 = () => {
    imageInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = [];
    const newImages = [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push(file);
      } else {
        newFiles.push(file);
      }
    });

    setFileNames((prevFileNames) => [...prevFileNames, ...newFiles]);
    setImageFiles((prevImageFiles) => [...prevImageFiles, ...newImages]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    setIsTyping(true);
    if (
      inputValue.trim() !== "" ||
      fileNames.length > 0 ||
      imageFiles.length > 0
    ) {
      const userMessage = {
        type: "user",
        content: inputValue,
        files: fileNames,
        images: imageFiles,
      };
      setMessages([...messages, userMessage]);
      setInputValue("");
      setFileNames([]);
      setImageFiles([]);

      // Hardcoded response
      if (inputValue.toLowerCase().includes("summary")) {
        setTimeout(() => {
          const botResponse = {
            type: "bot",
            content:
              "The daily energy generation report for November 20, 2019, shows that the energy generation system produced a total of 62.30 kWh of AC energy and 63.38 kWh of DC energy, with a conversion efficiency rate of 98.29%. The peak hour of energy generation occurred at 11:00:00, producing 8.28 kWh. The day was characterized by clear skies, a high average temperature of 29.73°C, and an average wind speed of 5.75 m/s. Air quality was excellent with low particulate levels. The report also includes environmental impact data, showing that the clean energy generated on this day contributed to improved air quality by reducing greenhouse gas emissions, promoting a healthier environment. It also provides recommendations for exploring increased energy storage capacity to leverage peak generation hours more effectively and enhance energy output during periods of lower generation.",
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
        }, 2000);
      } else if (inputValue.toLowerCase().includes("graph")) {
        setTimeout(() => {
          const botResponse = {
            type: "bot",
            content: `
            <div>
              <p>These graphs show the irradiance levels, or the amount of solar radiation reaching your solar panels, for November 20th and 27th, 2019. Let's analyze them:</p>
              <h2>Graph 1: November 20th, 2019</h2>
              <ul>
                <li><b>Peak Irradiance:</b> The graph shows a peak irradiance level of around 1,000 W/m², which indicates a clear day with high sunlight intensity.</li>
                <li><b>Consistent Production:</b> The irradiance levels remain relatively consistent throughout the day, suggesting a stable solar energy output with minimal cloud cover.</li>
                <li><b>Evening Drop-Off:</b> The noticeable drop in irradiance towards the end of the day indicates the sun setting and the reduction of available solar radiation.</li>
              </ul>
              <h2>Graph 2: November 27th, 2019</h2>
              <ul>
                <li><b>Lower Peak Irradiance:</b> The peak irradiance is significantly lower on this day, reaching around 400 W/m². This suggests a less sunny day with possible cloud cover.</li>
                <li><b>Variability:</b> You can see greater fluctuations in irradiance throughout the day, indicating intermittent cloud cover affecting the solar energy production.</li>
                <li><b>Sharp Drops:</b> The sharp drops in irradiance throughout the day point to periods of more significant cloud coverage or other weather events that block the sun's rays.</li>
              </ul>
              <h2>Implications for Agrivoltaics:</h2>
              <ul>
                <li><b>Crop Selection:</b> The difference in irradiance levels between these two days highlights the importance of choosing crops that can tolerate both higher and lower light levels. Crops that thrive in partial shade would be better suited for this location, as they could handle the variability in irradiance.</li>
                <li><b>Water Management:</b> Periods of higher irradiance will increase the need for irrigation to ensure crops don't dry out. The fluctuation in irradiance might require adjusting irrigation schedules to ensure optimal water availability for the chosen crops.</li>
                <li><b>Energy Production:</b> The variation in irradiance will directly impact your solar panel energy production. On days like November 27th, the energy generated will be lower than days like November 20th. This is important to consider for energy storage or grid connections to ensure you have a consistent energy supply.</li>
              </ul>
              <h2>Next Steps:</h2>
              <ul>
                <li><b>Long-Term Data:</b> It's crucial to analyze irradiance data over a longer period, including different seasons, to understand the overall pattern of solar radiation in your region.</li>
                <li><b>Weather Forecasting:</b> Utilize weather forecasts to anticipate changes in irradiance and make adjustments to crop management practices accordingly.</li>
                <li><b>Agrivoltaic System Design:</b> Consider the potential impact of varying irradiance levels on the design of your agrivoltaic system, ensuring sufficient shading for crops and maximizing energy production.</li>
              </ul>
              <p>By carefully analyzing these graphs and considering the long-term irradiance trends, you can optimize your agrivoltaic system for both energy production and agricultural yields.</p>
            </div>
          `,
          };
          setMessages((prev) => [...prev, botResponse]);
          setIsTyping(false);
        }, 2000);
      } else {
        // Default response for other inputs
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              content:
                "I'm sorry, I don't have specific information for that query. How else can I assist you?",
            },
          ]);
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  const removeFile = (index, type) => {
    if (type === "file") {
      setFileNames((prevFiles) => prevFiles.filter((_, i) => i !== index));
    } else if (type === "image") {
      setImageFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="main">
      <div className="nav">
        {/* <p>FarmAI</p> */}
        {/* <img src={assets.user_icon} alt="" /> */}
      </div>
      <div className="main-container">
        <div
          className="initial-chat"
          style={{ display: showChat ? "none" : "block" }}
        >
          <div className="greet">
            <p>
              <span>Hello,Im you farmAI</span>
            </p>
            <p>How can I help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>Where should i plan my to build an agrivoltaic farm?</p>
              <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
              <p>What plant should i plant with the solar panel</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>What is my ROI?</p>
              <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
              <p>Write me the report</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
        </div>
        <div
          className="chat-container"
          style={{ display: showChat ? "block" : "none", minHeight: "55vh" }}
        >
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === "user" && (
                  <div className="user-message" style={{ textAlign: "right" }}>
                    <p>
                      {message.files.map((file, fileIndex) => (
                        <div
                          key={index}
                          style={{
                            padding: "8px",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            src={assets.file_icon}
                            alt="Upload"
                            style={{ width: "18px", marginRight: "5px" }}
                          />
                          <span>{file.name}</span>
                        </div>
                      ))}
                      {message.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          style={{
                            padding: "8px",
                            marginLeft: "auto",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Upload"
                            style={{ width: "200px", marginRight: "5px" }}
                          />
                        </div>
                      ))}
                      <span
                        style={{
                          padding: "10px",
                          borderRadius: "15px",
                          backgroundColor: "#D3D3D3",
                        }}
                      >
                        {message.content}
                      </span>
                    </p>
                  </div>
                )}
                {message.type === "bot" && (
                  <div
                    className="bot-message"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="margin-top-30" style={{ marginTop: "30%" }}>
          {isTyping && <div className="loading">Loading...</div>}
          {fileNames.length > 0 && (
            <div className="file-preview">
              {fileNames.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button onClick={() => removeFile(index, "file")}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {imageFiles.map((image, imgIndex) => (
            <div className="file-item">
              <div
                key={imgIndex}
                style={{
                  padding: "8px",
                  marginLeft: "auto",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Upload"
                  style={{ width: "100px", marginRight: "5px" }}
                />
              </div>
              <button onClick={() => removeFile(imgIndex, "image")}>
                Remove
              </button>
            </div>
          ))}
          <div className="search-box">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a prompt here"
            />
            <div className="input-actions">
              <img
                src={assets.file_icon}
                alt="Upload"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img
                src={assets.gallery_icon}
                alt="Gallery"
                onClick={handleImageClick2}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <img src={assets.mic_icon} alt="Microphone" />
              <img
                src={assets.send_icon}
                alt="Send"
                onClick={handleSendMessage}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate information. Please verify with a
            reliable source before making any decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartAssistantMain;
