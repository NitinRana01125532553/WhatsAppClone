import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat }) => {
  const [randomImage, setRandomImage] = useState();

  useEffect(() => {
    setRandomImage(Math.floor(Math.random() * 1000));
  }, []);
  console.log(randomImage);

  const createChat = () => {
    const name = prompt("Please enter a name for chat");

    if (name) {
      // store the name into database;
    }
  };

  return !addNewChat ? (
    <div className="sidebar_chat">
      <Avatar
        src={`https://source.unsplash.com/random/?person&${randomImage}`}
        sx={{ width: 56, height: 56 }}
      />
      <div className="sidebar_chat_info">
        <h3>Name</h3>
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
