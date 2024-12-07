import React, { useEffect, useState, useRef } from 'react';
import { user } from '../../Components/Join/Join';
import './chat.css';
import socketIO from 'socket.io-client';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';

const ENDPOINT = 'http://localhost:4500/';
let socket;

function Chat() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [messages1, setMessages1] = useState([]);
  const inputRef = useRef(null);

  const send = () => {
    if (message.trim()) {
      socket.emit('message', { message, id });
      setMessage('');
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('Connected to the server');
      setId(socket.id);
    });

    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessages1((prev) => [...prev, { user: data.user, message: data.message, id: data.id }]);
    });

    socket.on('userJoined', (data) => {
      setMessages1((prev) => [...prev, { user: data.user, message: data.message, id: data.id }]);
    });

    socket.on('leave', (data) => {
      setMessages1((prev) => [...prev, { user: data.user, message: data.message, id: data.id }]);
    });

    socket.on('send message', (data) => {
      setMessages1((prev) => [...prev, { user: data.user, message: data.message, id: data.id }]);
    });

    return () => {
      socket.emit('disConnect');
      socket.off();
    };
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"><h2>
          Chat Room
          </h2></div>
        <ReactScrollToBottom className="chatbox">
          {messages1.map((item, i) => (
            <Message
              key={i}
              message={item.message}
              user={item.id === id ? '' : item.user}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputbox">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
