import React, { Fragment } from "react";
import Form from "./components/Form/Form";
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import LoggedIn from "./components/LoggedIn";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Fragment>
    <Router>
    <section className='container'>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route exact path='/loggedin' component={LoggedIn} />
        <Route component={NotFound} />
      </Switch>
      </section>
    </Router>
    </Fragment>
  );
};

export default App;
