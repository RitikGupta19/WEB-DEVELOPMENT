import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddPost from "./components/Pages/AddPost";
import BlogPost from "./components/Pages/BlogPost";
import Errors from "./components/Pages/Error";
import Tables from "./components/Pages/Tables";
import UserProfile from "./components/Pages/UserProfile";
import FormComponents from "./components/Pages/FormComponents";
import BlogDashboard from "./components/Pages/BlogDashboard/BlogDashboard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={BlogDashboard} />
      <Route path='/addPost' component={AddPost} />
      <Route path='/blogPosts' component={BlogPost} />
      <Route path='/errors' component={Errors} />
      <Route path='/tables' component={Tables} />
      <Route path='/userProfile' component={UserProfile} />
      <Route path='/formComponents' component={FormComponents} />
    </Switch>
  );
};

export default Routes;
