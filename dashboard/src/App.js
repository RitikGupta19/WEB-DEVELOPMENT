import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddPost from "./components/Pages/AddPost";
import BlogPost from "./components/Pages/BlogPost";
import Errors from "./components/Pages/Error";
import Tables from "./components/Pages/Tables";
import UserProfile from "./components/Pages/UserProfile";
import FormComponents from "./components/Pages/FormComponents";

// const App = () => {
//   return (
//     <div>
//       <Router>
//         <Navbar />
//         <Switch>
//           <Route path='/' exact component={Home} />
//           <Route path='/addPost' component={AddPost} />
//           <Route path='/blogPosts' component={BlogPost} />
//           <Route path='/errors' component={Errors} />
//           <Route path='/tables' component={Tables} />
//           <Route path='/userProfile' component={UserProfile} />
//           <Route path='/formComponents' component={FormComponents} />
//         </Switch>
//       </Router>
//     </div>
//   );
// };

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/addPost' component={AddPost} />
          <Route path='/blogPosts' component={BlogPost} />
          <Route path='/errors' component={Errors} />
          <Route path='/tables' component={Tables} />
          <Route path='/userProfile' component={UserProfile} />
          <Route path='/formComponents' component={FormComponents} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
