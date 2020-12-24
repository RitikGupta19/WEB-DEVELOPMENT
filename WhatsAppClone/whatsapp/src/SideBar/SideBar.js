import React, { useEffect, useState } from "react";
import "./SideBar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import user from "../Images/man.svg";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "../Firebase/firebase";
import { useStateValue } from "../Context/StateProvider";

const SideBar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const getRooms = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };
  useEffect(() => {
    getRooms();
    return () => {
      getRooms();
    };
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src={user ? user.photoURL : ""} />
        <div className='sidebar_headerRight'>
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
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search or Start a new chat' />
        </div>
      </div>
      <div className='sidebar_chats'>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
