import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
//import { print_state, print_city } from './cities';

const Profile = () => {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        password: "",
        cpassword: "",
        address: "",
    })

    const changeHandler = () => {

    };

    const submitHandler = () => {

    };

    const detailForm = () => {
        return (
            <div className="container">
            <Link to="/user/dashboard" type="submit" className="btn btn-primary btn-outline btn-md">User Dashboard</Link>
            <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label for="inputEmail4">First Name</label>
                <input type="text" className="form-control" id="inputEmail4" placeholder="FirstName"/>
                </div>
                <div className="form-group col-md-6">
                <label for="inputPassword4">Last Name</label>
                <input type="text" className="form-control" id="inputPassword4" placeholder="LastName"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label for="inputEmail4">New Password</label>
                <input type="text" className="form-control" id="inputEmail4" placeholder="Password"/>
                </div>
                <div className="form-group col-md-6">
                <label for="inputPassword4">Confirm Password</label>
                <input type="text" className="form-control" id="inputPassword4" placeholder="Password"/>
                </div>
            </div>
            <div className="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" className="form-control" id="inputAddress" placeholder="Eg: 1234 Main St"/>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label for="state">State</label>
            <select></select>
                </div>
                </div>
                <div className="form-group col-md-4">
                <label for="inputState">City</label>
               <select></select>
                <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip"/>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            </form>
            </div>
        );
    };

    return (
        <Base 
            title="Profile Section"
            description="Edit your Credentials">
           {detailForm()}
        </Base>
    );
};

export default Profile;

 // <select 
                //     className="form-control"
                //     onchange={print_city('state', document.getElementById('sts').selectedIndex)} 
                //     id="sts" 
                //     name ="stt" 
                //     required></select>

                // <select id ="state" class="form-control" required></select>

                // {print_state(document.getElementById("sts"))}
               