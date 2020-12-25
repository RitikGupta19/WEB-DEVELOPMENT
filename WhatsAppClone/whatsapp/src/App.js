import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import SideBar from "./SideBar/SideBar";
// import Pusher from "pusher-js";
// import axios from "./Axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import { useStateValue } from "./Context/StateProvider";

function App() {
  // NOTE commented section works and contact with MONOGODB and PUSHER version

  // const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // useEffect(() => {
  //   axios.get("/messages/sync").then((resp) => {
  //     setMessages(resp.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("48df40e2181cc2294e52", {
  //     cluster: "ap2",
  //   });

  //   const channel = pusher.subscribe("messages");
  //   channel.bind("inserted", function (data) {
  //     setMessages([...messages, data]);
  //   });

  //   return () => {
  //     channel.unbind_all();
  //     channel.unsubscribe();
  //   };
  // }, [messages]);

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <div className='app_body'>
              <SideBar />
              <Route exact path='/rooms/:roomID' component={Chat} />
              {/*<Chat messages={messages} />*/}
              <Route path='/' />
            </div>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
