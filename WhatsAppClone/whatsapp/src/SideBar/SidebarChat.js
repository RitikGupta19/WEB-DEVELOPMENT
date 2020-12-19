import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { addRooms } from "../Firebase/firebaseApi";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Enter room name");
    if (roomName) {
      // TODO - database stuff
      addRooms(roomName);
    }
  };

  return (
    <div>
      {!addNewChat ? (
        <div className='sidebarChat'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='sidebarChat_info'>
            <h2>{name}</h2>
            <p>Last message sent</p>
          </div>
        </div>
      ) : (
        <div className='sidebarChat' onClick={createChat}>
          <h2>Add new Chat</h2>
        </div>
      )}
    </div>
  );
};

export default SidebarChat;
