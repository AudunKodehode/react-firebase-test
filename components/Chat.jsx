import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import "./Chat.css";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  // Set up a real-time listener to fetch messages
  useEffect(() => {
    const docRef = doc(db, "chat", "messages");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      }
    });
    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    //// set username to cookie

    const messageInput = document.getElementById("messageInput");

    const timeNow = new Date();
    const time = `${timeNow.getHours()}:${timeNow.getMinutes()}`;
    const messageText = messageInput.value;

    if (messageText !== "" && username !== "") {
      try {
        const message = `${time} ${username}: ${messageText}`;
        const docRef = doc(db, "chat", "messages");

        // Get the current chat messages and append the new message
        const docSnap = await getDoc(docRef);
        const currentMessages = docSnap.data().messages || [];
        currentMessages.push(message);

        // Update the document with the new messages
        await setDoc(docRef, { messages: currentMessages });
        messageInput.value = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else if (username === "") {
      //   appendMessage("Error! Please enter a name.");
    }
  };
  addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("messageInput")
      .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          sendMessage();
        }
      });
    getCookieData();
  });

  function getCookieData() {
    if (document.cookie.length > 0) {
      document.getElementById("nameInput").value = document.cookie;
      setUsername(document.cookie);
    }
  }
  const handleChange = (e) => {
    setUsername(e.target.value);
    document.cookie = e.target.value;
  };

  return (
    <div className="chat">
      <div className="settings">
        <label htmlFor="nameInput">Name:</label>
        <input
          id="nameInput"
          type="text"
          placeholder="Name"
          onChange={handleChange}
        />
      </div>
      <div id="messages" className="messages">
        {messages.slice(-20).map((message, index) => (
          <div className="chatMessage" key={index}>
            {message}
          </div>
        ))}
      </div>

      <div className="newMessage">
        <input id="messageInput" type="text" placeholder="Message" />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
