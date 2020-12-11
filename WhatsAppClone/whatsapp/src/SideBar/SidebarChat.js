import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = () => {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className='sidebarChat_info'>
        <h2>Person Name</h2>
        <p>Last message sent</p>
      </div>
    </div>
  );
};

export default SidebarChat;
