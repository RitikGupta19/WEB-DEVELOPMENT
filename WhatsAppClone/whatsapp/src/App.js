import React from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import SideBar from "./SideBar/SideBar";

function App() {
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
