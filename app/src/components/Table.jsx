import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import "./Table.css"
import { deleteUsers, addUser, UpdateUser } from "../service/usersService"

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    salary: 0,
    currency: '',
    position: '',
  });

  const [updatedUser, setUpdatedUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    salary: 0,
    currency: '',
    position: '',
  });

  const fetchData = async () => {
    const response = await axiosInstance.get(`https://localhost:7234/api/users`);
    setUsers(response.data.users);
  };

  const deleteResponse = (userId) => {
    const shouldDelete = window.confirm("Do you want to delete the user?");

    if (shouldDelete) {
        deleteUsers(userId);
        fetchData();
    } else {
        
    }
};

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleOpenUpdateModal = () => {
    setUpdatedUser({
      id: selectedUser.id,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      address: selectedUser.address,
      salary: selectedUser.salary,
      currency: selectedUser.currency,
      position: selectedUser.position,
    });
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleAddUser = async () => {
    try {
      if (
        !newUserData.firstName ||
        !newUserData.lastName ||
        !newUserData.address ||
        !newUserData.salary ||
        !newUserData.currency ||
        !newUserData.position
      ) {
        console.error('All fields must be filled.');
        return;
      }
      await addUser(newUserData);
      console.log('User added successfully.');
      setNewUserData({
        firstName: '',
        lastName: '',
        address: '',
        salary: 0,
        currency: '',
        position: '',
      });
      setAddModalOpen(false);
      fetchData(); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handelUpdateUser = async () => {
    try {
      if (
        !updatedUser.firstName ||
        !updatedUser.lastName ||
        !updatedUser.address ||
        !updatedUser.salary ||
        !updatedUser.currency ||
        !updatedUser.position
      ) {
        console.error('All fields must be filled.');
        return;
      }
      await UpdateUser(updatedUser);
      console.log('User updated successfully.');
      setUpdateModalOpen(false);
      fetchData(); 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Table</h1>
      <button className =""onClick={() => setAddModalOpen(true)}>
        Add New Users
      </button>
      <table className="smaller-table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Currency</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)  => (
            <tr key={user.id}  className='cursor_table' onClick={() => setSelectedUser(user)} >
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.salary}</td>
              <td>{user.currency}</td>
              <td>{user.position}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="right-side-form">
          <h2>User Details</h2>
          <p>ID: {selectedUser.id}</p>
          <p>First Name: {selectedUser.firstName}</p>
          <p>Last Name: {selectedUser.lastName}</p>
          <p>Address: {selectedUser.address}</p>
          <p>Salary: {selectedUser.salary}</p>
          <p>Currency: {selectedUser.currency}</p>
          <p>Position: {selectedUser.position}</p>
          <button className='put-button' onClick={handleOpenUpdateModal}>Update</button>
          <button className='delete-button' onClick={() => deleteResponse(selectedUser.id)}>Delete Users</button>
          <button className='close-button' onClick={() => setSelectedUser(null)}>Close Options</button>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setAddModalOpen(false)}>&times;</span>
            <h2>Add User</h2>
            <label htmlFor="firstName">Name:</label>
            <input type="text" id="firstName" onChange={handleInputChange} value={newUserData.firstName} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" onChange={handleInputChange} value={newUserData.lastName} />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" onChange={handleInputChange} value={newUserData.address} />
            <label htmlFor="salary">Salary:</label>
            <input type="number" id="salary" onChange={handleInputChange} value={newUserData.salary} />
            <label htmlFor="currency">Currency:</label>
            <input type="text" id="currency" onChange={handleInputChange} value={newUserData.currency} />
            <label htmlFor="position">Position:</label>
            <input type="text" id="position" onChange={handleInputChange} value={newUserData.position} />
            <button onClick={handleAddUser}>Add</button>
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseUpdateModal}>&times;</span>
            <h2> Update User</h2>
            <label htmlFor="firstName">Name:</label>
            <input
              type="text"
              id="firstName"
              value={updatedUser.firstName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={updatedUser.lastName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={updatedUser.address}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
            />
            <label htmlFor="salary">Salary:</label>
            <input
              type="number"
              id="salary"
              value={updatedUser.salary}
              onChange={(e) => setUpdatedUser({ ...updatedUser, salary: e.target.value })}
            />
            <label htmlFor="currency">Currency:</label>
            <input
              type="text"
              id="currency"
              value={updatedUser.currency}
              onChange={(e) => setUpdatedUser({ ...updatedUser, currency: e.target.value })}
            />
            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              value={updatedUser.position}
              onChange={(e) => setUpdatedUser({ ...updatedUser, position: e.target.value })}
            />
            <button onClick={handelUpdateUser}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;