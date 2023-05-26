import React from "react";
import db from "./Firebase";
import { useEffect } from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { collection, onSnapshot } from "firebase/firestore";

const Sidebar = () => {
  // state to store all the rooms
  const [rooms, setRooms] = React.useState([]);

  // fetching all data of rooms from database into rooms state
  useEffect(() => {
    // adding an event listener to rooms collection from db and taking a snapshot
    onSnapshot(collection(db, "rooms"), (snapshot) => {
      // setting the value of rooms state
      setRooms(
        // mapping over the docs inside snapshot and for every element
        // returning its id and data to store in our state
        snapshot.docs.map((x) => ({
          id: x.id,
          data: x.data(),
        }))
      );
    });
  }, []);
  console.log(rooms);

  return (
    <div className="sidebar">
      {/* displays the company name and logo etc. on top of sidebar */}
      <header className="sidebar_header">
        <Avatar />
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </header>

      {/* The search bar to search of contacts */}
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <SearchIcon />
          <input placeholder="Search or start new chat" type="text"></input>
        </div>
      </div>

      {/* List of all the chats  */}
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((x) => (
          <SidebarChat key={x.id} name={x.data.name} id={x.id} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
