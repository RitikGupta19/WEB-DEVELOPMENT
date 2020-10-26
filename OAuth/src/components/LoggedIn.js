import React from "react";

const LoggedIn = ({ history }) => {
  const logout = () => {
    history.replace("/");
  };
  return (
    <div>
      You are logged in
      <button className='btn btn-primary' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};

export default LoggedIn;
