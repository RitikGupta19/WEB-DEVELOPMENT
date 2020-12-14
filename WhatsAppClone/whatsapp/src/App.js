import React from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import SideBar from "./SideBar/SideBar";

function App() {
  useEffect(() => {
    var pusher = new Pusher("48df40e2181cc2294e52", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);
  return (
    <div className='app'>
      <div className='app_body'>
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
