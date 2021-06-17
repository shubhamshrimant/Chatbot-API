import "./ChatBot.css";
import React, { useState } from "react";

import axios from "axios";

const ChatBot = () => {
  const [chat, setChat] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [response, setResponse] = useState([]);

  const handleSubmit = (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };

    if (event.key === "Enter") {
      setChat([...chat, message.text]);
      axios
        .post("https://chatbot-flask-api.herokuapp.com/" + message.text)
        .then((data) => {
          console.log(data.data.data);

          setResponse([...response, data.data.data]);
        })
        .catch((err) => console.log(err));

      setCurrentMessage("");
    }
  };

  const onTextChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div className="center-div">
      <div className="container">
        <div className="chat">
          <div className="header">
            <div className="profile">
              <div className="left">
                <h2>Covid Bot</h2>
                <span>online</span>
              </div>
              <div className="right"></div>
            </div>
          </div>

          <div className="chat-box">
            {chat.map((data, index) => (
              <div className="chat-feed">
                <div className="my-chat" key={index}>
                  {data}
                </div>

                <div className="their-chat">
                  {response[index] === undefined ? (
                    <div className="loading">
                      <label>Typing</label>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    response[index]
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="footer">
            <input
              type="text"
              autoComplete="off"
              name="message"
              placeholder="Say something..."
              onChange={(e) => onTextChange(e)}
              value={currentMessage}
              onKeyDown={handleSubmit}
              autoFocus={false}
            />
            <div className="attach-cam"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
