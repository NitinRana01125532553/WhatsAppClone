import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "./Firebase";
import { Link } from "react-router-dom";

// add new chat
const SidebarChat = ({ id, addNewChat, name }) => {
  // profile image state
  const [randomImage, setRandomImage] = useState();

  // find a random image from unsplash db
  useEffect(() => {
    setRandomImage(Math.floor(Math.random() * 1000));
  }, []);
  console.log(randomImage);

  // function to actually create the chat
  const createChat = () => {
    // taking in name for chat
    const name = prompt("Please enter a name for chat");

    if (name) {
      addDoc(collection(db, "rooms"), {
        name: name,
      });
    }
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      const roomsCol = collection(db, "rooms");
      const roomsDoc = doc(roomsCol, id);
      const messagesCol = collection(roomsDoc, "messages");
      const messagesOrder = query(messagesCol, orderBy("timeStamp", "desc"));

      onSnapshot(messagesOrder, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [id]);
  console.log("This is message: " + messages);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar
          src={`https://source.unsplash.com/random/?person&${randomImage}`}
          sx={{ width: 56, height: 56 }}
        />
        <div className="sidebar_chat_info">
          <h3>{name}</h3>
          <p>{messages[0]?.message.slice(0, 20)}....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_chat">
      <h3>add new chat</h3>
    </div>
  );
};

export default SidebarChat;
