import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import SideBar from "./SideBar/SideBar";
import Pusher from "pusher-js";
import axios from "./Axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((resp) => {
      setMessages(resp.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("48df40e2181cc2294e52", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className='app'>
      <div className='app_body'>
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
