import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    const response = await axios.post('/chat', { query: input });
    setMessages([...messages, { text: input, user: true }, { text: JSON.stringify(response.data), user: false }]);
    setInput('');
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Chatbot</h2>
      </div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, ...styles[msg.user ? 'userMessage' : 'botMessage'] }}>
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '400px',
    height: '300px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    padding: '10px 20px',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
  },
  headerText: {
    margin: 0,
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#f7f7f7',
  },
  message: {
    margin: '10px 0',
    padding: '10px 15px',
    borderRadius: '20px',
    maxWidth: '70%',
    lineHeight: '1.4',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#daf8cb',
    color: '#000',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8e8e8',
    color: '#000',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px 20px',
    borderTop: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    marginRight: '10px',
    outline: 'none',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    outline: 'none',
  }
};

export default Chat;
