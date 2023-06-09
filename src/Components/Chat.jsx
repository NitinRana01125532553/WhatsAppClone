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
import db from "./Firebase";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import firebase from "firebase/compat/app";

// the actual chat section of users
const Chat = () => {
  // to hold the random profile image
  const [randomImage, setRandomImage] = useState();
  // the text entered by user to send
  const [inputMessage, setInputMessage] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomName(snapshot.data().name);
      });

      // access the message properties inside message doc in messages sub-collection
      //inside rooms doc inside rooms collection

      // accessing rooms collection
      const roomsCol = collection(db, "rooms");
      // accessing the different room docs inside rooms collection
      const roomDoc = doc(roomsCol, roomId);
      // accessing the messages collection inside each room doc
      const messagesCol = collection(roomDoc, "messages");
      // ordering messages collection by timestamp
      const messageDoc = query(messagesCol, orderBy("timeStamp", "asc"));

      onSnapshot(messageDoc, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);
  console.log(messages);

  // finding a random number and assignining to state
  useEffect(() => {
    setRandomImage(Math.floor(Math.random() * 1000));
  }, [roomId]);

  // function to send message
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed =>", inputMessage);
    // accessing rooms collection
    const roomsCol = collection(db, "rooms");
    // accessing the different room docs inside rooms collection
    const roomDoc = doc(roomsCol, roomId);
    // accessing the messages collection inside each room doc
    const messagesCol = collection(roomDoc, "messages");

    // adding doc inside
    addDoc(messagesCol, {
      message: inputMessage,
      name: user.displayName,
      timeStamp: serverTimestamp(),
    });

    setInputMessage("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://source.unsplash.com/random/?person&${randomImage}`}
          sx={{ width: 58, height: 58 }}
        />

        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timeStamp?.toDate()
            ).toUTCString()}{" "}
          </p>
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
        {messages.map((message) => (
          // eslint-disable-next-line react/jsx-key
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">~{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timeStamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
