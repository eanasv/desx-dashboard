import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import { userapi } from "../../service/Config";

export const UserList = ({ refresh, setUserDetailsForEdit, deleteUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, [refresh]);

  const getAllUsers = () => {
    getHttp(userapi + "allUsers")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
    ///
  };

  const editUser = (id) => {
    getHttp(userapi + id)
      .then((response) => {
        console.log(response);
        setUserDetailsForEdit(response);
        //setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Entity</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* Other table headers */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.entity}</td>
              <td onClick={() => editUser(user.id)}>
                <img
                  src={require(`../../assets/edit.png`)}
                  alt="SVG"
                  width="25px"
                  height="25px"
                />
              </td>
              <td onClick={() => deleteUser(user.id)}>
                {" "}
                <img
                  src={require(`../../assets/delete.png`)}
                  alt="SVG"
                  width="25px"
                  height="25px"
                />
              </td>
              {/* Other table cells */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
