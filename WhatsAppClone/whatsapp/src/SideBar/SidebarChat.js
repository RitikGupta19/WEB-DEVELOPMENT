import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { addRooms } from "../Firebase/firebaseApi";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import db from "../Firebase/firebase";

const SidebarChat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");
  const [lastMsg, setLastMsg] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setLastMsg(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

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
        <Link to={`/rooms/${id}`}>
          <div className='sidebarChat'>
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className='sidebarChat_info'>
              <h2>{name}</h2>
              <p>{lastMsg[0]?.message}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className='sidebarChat' onClick={createChat}>
          <h2>Add new Chat</h2>
        </div>
      )}
    </div>
  );
};

export default SidebarChat;
