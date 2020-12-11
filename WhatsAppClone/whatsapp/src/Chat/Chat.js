import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";
import "./Chat.css";

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>Room Name</h3>
          <p>Last seen ...</p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        <p className='chat_message'>
          <span className='chat_name'>Sonny</span>
          This is a message
          <span className='chat_timestamp'>{new Date().toString()}</span>
        </p>

        <p className='chat_receiver chat_message'>
          <span className='chat_name'>Sonny</span>
          This is a message
          <span className='chat_timestamp'>{new Date().toString()}</span>
        </p>

        <p className='chat_message'>
          <span className='chat_name'>Sonny</span>
          This is a message
          <span className='chat_timestamp'>{new Date().toString()}</span>
        </p>
      </div>
      <div className='chat_footer'>
        <InsertEmoticonIcon />
        <form>
          <input type='text' placeholder='Type a message' />
          <button type='submit'>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
