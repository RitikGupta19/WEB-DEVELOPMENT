import React, { Fragment, useState } from "react";
import "./Form.css";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Any filteratios here
    if (firstName === "" || email === "" || password === " ") {
      console.log("Please Enter complete details ");
    } else {
      // Handle Api Submission Here
      // Call to API
      console.log(formData);
    }
  };

  const responseGoogle = (response) => {
    //console.log(response);
  };

  const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <Fragment>
      <div className='card shadow-lg p-3 mb-5 bg-white rounded col-6 mx-auto'>
        <form onSubmit={(e) => onSubmit(e)}>
          <h3>
            <h4 className='font text-center'>SIGN UP</h4>
          </h3>

          <h2 className='text-center font'>Create your Account</h2>
          <p className='text-center font'>
            Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <div className='row'>
            <div className='col'>
              {/* Pass function call to Google Auth on button click*/}
              <div style={{ width: "50%" }} className='float-right'>
                <GoogleLogin
                  clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
                  buttonText='Login'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
            <div className='col'>
              {/* Pass function call to Facebook Auth on button click*/}
              <div style={{ width: "50%" }} className='float-left mx-auto'>
                <button type='submit' className='btn btn-light btn-block'>
                  <i
                    class='fa fa-facebook-official fa-1x'
                    aria-hidden='true'></i>
                  Sign Up with Facebook
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className='form-group'>
            <input
              name='firstName'
              type='text'
              className='form-control'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <input
              name='lastName'
              type='text'
              className='form-control'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => onChange(e)}
            />
            <br />
            <input
              name='email'
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <input
              name='password'
              type='password'
              className='form-control'
              placeholder='Password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <p>
            By clicking Sign Up, you agree to our{" "}
            <a href='https://github.com/kshivam654/'>Terms Of Use</a> and our{" "}
            <a href='https://github.com/kshivam654/'>Privacy Policy.</a>
          </p>
          <button type='submit' className='btn btn-dark btn-block'>
            Sign Up
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Form;
