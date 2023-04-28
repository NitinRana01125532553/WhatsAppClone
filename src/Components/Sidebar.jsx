import React from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
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
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
