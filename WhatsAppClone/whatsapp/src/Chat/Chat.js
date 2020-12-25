import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "../Axios";
import { useParams } from "react-router-dom";
import db from "../Firebase/firebase";
import { useStateValue } from "../Context/StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomID } = useParams();
  const [roomName, setRoomName] = useState("");
  // NOTE for firebase
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomID) {
      db.collection("rooms")
        .doc(roomID)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomID)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomID]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomID]);

  const sendMessage = async (e) => {
    e.preventDefault();
    // await axios.post("/messages/new", {
    //   message: input,
    //   name: "DEMO APP",
    //   timestamp: new Date(),
    //   received: false,
    // });

    db.collection("rooms").doc(roomID).collection("messages").add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat_headerInfo'>
          <h3>{roomName}</h3>
          <p>
            {messages[messages.length - 1]?.timestamp?.toDate().toUTCString()}
          </p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {/* NOTE MONGODB and PUSHER version
          {messages.map((message) => (
          <p className={`chat_message ${message.received && `chat_receiver`}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>{message.timestamp}</span>
          </p>
          ))} */}
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && `chat_receiver`
            }`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className='chat_footer'>
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Type a message'
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
