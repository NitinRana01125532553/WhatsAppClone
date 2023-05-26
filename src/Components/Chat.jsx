import "./Chat.css";
import React from "react";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

const Chat = () => {
  const [randomImage, setRandomImage] = useState();

  useEffect(() => {
    setRandomImage(Math.floor(Math.random() * 1000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed =>", inputMessage);
    setInputMessage("");
  };

  const [inputMessage, setInputMessage] = useState("");

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://source.unsplash.com/random/?person&${randomImage}`}
          sx={{ width: 58, height: 58 }}
        />

        <div className="chat_header_info">
          <h3>Name</h3>
          <p>Last seen at ....</p>
        </div>

        <div className="chat_header_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        <p className={`chat_message ${true && "chat_reciever"}`}>
          <span className="chat_name">~User</span>
          This is a message
          <span className="chat_timestamp">1:21am</span>
        </p>
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(change) => setInputMessage(change.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
