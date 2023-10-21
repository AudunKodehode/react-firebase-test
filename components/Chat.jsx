import "./Chat.css";

import db from '../firebase'; // Import your Firebase configuration
import { doc,  setDoc } from 'firebase/firestore';

const sendMessage = async () => {
    try {
      const docRef = doc(db, 'chat', 'messages'); // Reference to the single document
      await setDoc(docRef, { message: {messageInput: document.getElementById('messageInput').value} });
    } catch (error) {
      console.error('Error incrementing count:', error);
    }
  };
  sendMessage(); 

export default function Chat() {
  return (
    <div className="chat">
      <div className="settings">
        <input id="nameInput" type="text" placeholder="Name" />
        <button>Save</button>
      </div>
      <div className="messages"></div>

      <div className="newMessage">
        <input id="messageInput" type="text" placeholder="Message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
