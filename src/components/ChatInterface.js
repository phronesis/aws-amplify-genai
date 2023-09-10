// src/components/ChatInterface.js
import React, { useState } from 'react';
import './ChatInterface.css'; // Import the CSS file
import loadingGif from '../typing-loading.gif'



function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      setMessages(messages =>[...messages, { text: inputMessage, user: 'user' }]);
      setInputMessage('');
      // Simulate a chatbot response (you can replace this with actual chatbot logic)
      //setMessages([...messages, { text: `${inputMessage}`, user: 'chatbot' }]);
      let response = await passMessageToAPI(inputMessage);
      setMessages(messages=>[...messages, { text: `${response}`, user: 'chatbot' }]);
      
    }
  };

  const passMessageToAPI = async (msg) => {
    setIsLoading(true);
   
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        prompt: msg
      })
    })

    const ans =  await response.json();
    setIsLoading(false);

    return (typeof ans.body === 'undefined') ? 'Sorry, i\'m not able to provide a response now' : ans.body

  }

  


  return (
    <div className="chat-interface">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.user}`}>
              {message.user} : {message.text}
            </div>
          ))}
          <img src={loadingGif} alt="loading" className="loading" style={{visibility: (isLoading ? 'visible' : 'hidden')}}/>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }}}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
