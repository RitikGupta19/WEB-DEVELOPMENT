import React, { Fragment } from "react";
import Form from "./components/Form/Form";
import Logo from "./components/Logo";

const App = () => {
  return (
    <Fragment>
      <section className='container'>
        <Logo />
        <Form />
      </section>
    </Fragment>
  );
};

export default App;
