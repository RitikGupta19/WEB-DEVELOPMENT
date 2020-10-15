import React, { Fragment } from "react";
import company from "../img/company.png";
const Logo = () => {
  return (
    <Fragment>
      <img
        src={company}
        alt='company logo'
        className='rounded mx-auto d-block img-fluid'></img>
    </Fragment>
  );
};

export default Logo;
