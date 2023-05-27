import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { addDoc, collection } from "firebase/firestore";
import db from "./Firebase";

// add new chat
const SidebarChat = ({ addNewChat, name }) => {
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

  return !addNewChat ? (
    <div className="sidebar_chat">
      <Avatar
        src={`https://source.unsplash.com/random/?person&${randomImage}`}
        sx={{ width: 56, height: 56 }}
      />
      <div className="sidebar_chat_info">
        <h3>{name}</h3>
        <p>Last message....</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar_chat">
      <h3>add new chat</h3>
    </div>
  );
};

export default SidebarChat;
