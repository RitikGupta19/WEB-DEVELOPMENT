import React, {useState} from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';

import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {

    const [ values, setValues ] = useState({
       email: "ritik@gmail.com",
       password: "ritik",
       error: "",
       // Just to show user, some process is going on
       loading: false,
       didRedirect: false 
    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const changeHandler = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Since something is happening so showing loading--> true
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false})
            }
            else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    });
                });
            }
        })
        .catch(err => console.log("Sign In Failed"))
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            }
            else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
          return <Redirect to="/" />;
        }
    };

    const loadingMessage = () => {
      return (
          loading && (
              <div className="alert alert-info">
                  <h2>Loading...</h2>
              </div>
          )   
      );
  };

  const errorMessage = () => {
      return (
          <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
                  <div
                      className="alert alert-danger"
                      style={{ display: error ? "" : "none" }}
                  >
                      {error}
                  </div>
              </div>
        </div>
      );
  }; 

    const signInForm = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                value={email}
                                onChange={changeHandler("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                                className="form-control" 
                                type="password" 
                                value={password}
                                onChange={changeHandler("password")}                                />
                        </div>
                        <button 
                            className="btn btn-success btn-block"
                            onClick={onSubmitHandler}>Submit</button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <Base title="SignIn" description="Login Now!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    );
};

export default Signin;