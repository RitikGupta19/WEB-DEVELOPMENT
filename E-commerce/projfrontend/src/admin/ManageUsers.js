import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { getAllUsers, deleteAUser, updateUserRole } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    const {user, token} = isAuthenticated();

    const preLoad = () => {
        getAllUsers(user._id, token)
        .then(data=> {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setUsers(data);
            }
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        preLoad();
    }, []);

    const deleteThisUser = (deleteUserId) => {
        deleteAUser(user._id, token, deleteUserId )
        .then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                preLoad();
            }
        })
        .catch(err => console.log(err));
    };

    const changeRole = (roleId, role) => {
        if (role === 1) {
            updateUserRole(user._id, token, roleId, 0)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    preLoad();
                }
            })
            .catch(err => console.log(err));
        }
        else if (role === 0) {
            updateUserRole(user._id, token, roleId, 1)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                }
                else {
                    preLoad();
                }
            })
            .catch(err => console.log(err));
        }
    };

    const userTable = () => {
        return (
            <table className="table">
            <thead className="thead bg-success">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Change Role</th>
                <th scope="col">Delete User</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user, index) => {
                return (
                    <tr key={index} className="text-white">
                    <th scope="row">{index}</th>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    {user.role === 1 ? (
                        <td><Link
                        to="#"
                        onClick={() => {changeRole(user._id, user.role)}}
                        className="badge badge-pill badge-success">Make User</Link></td>
                    ) : (
                        <td><Link
                        to="#"
                        onClick={() => {changeRole(user._id, user.role)}}
                        className="badge badge-pill badge-warning">Make Admin</Link></td>
                    )}

                    <td><Link
                        to="#"
                        onClick={() => {deleteThisUser(user._id)}}
                        className="badge badge-pill badge-danger">Delete</Link></td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        );
    };

    return (
       <Base
        title="Users Section"
        description="Users Details Here">
        {userTable()}
       </Base>
    );
};

export default Users;
