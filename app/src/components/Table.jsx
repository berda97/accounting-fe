import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import "./Table.css"
import Button from './Button';
import { deleteUsers, addUser, UpdateUser } from "../service/usersService"
import AddUserModal from '../model/addUsersModel';
import UpdateUsersModel from '../model/updateUsersModel';
import UserDetailsModel from '../model/detalsUserModel';


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
        !selectedUser.firstName ||
        !selectedUser.lastName ||
        !selectedUser.address ||
        !selectedUser.salary ||
        !selectedUser.currency ||
        !selectedUser.position
      ) {
        console.error('All fields must be filled.');
        return;
      }
      await UpdateUser(selectedUser);
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
      <Button className="put-button" onClick={() => setAddModalOpen(true)}>
        Add New Users
      </Button>
      <AddUserModal
        isModalOpen={isAddModalOpen}
        handleCloseModal={() => setAddModalOpen(false)}
        handleInputChange={(e) => setNewUserData({ ...newUserData, [e.target.id]: e.target.value })}
        newUserData={newUserData}
        handleAddUser={handleAddUser}
      />

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
          {users.map((user) => (
            <tr key={user.id} className='cursor_table' onClick={() => setSelectedUser(user)} >
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
      <UserDetailsModel
        selectedUser={selectedUser}
        handleOpenUpdateModal={handleOpenUpdateModal}
        deleteResponse={deleteResponse}
        handleCloseOptions={() => setSelectedUser(null)}
      />
      <UpdateUsersModel
        isModalOpen={isUpdateModalOpen}
        handleCloseModal={handleCloseUpdateModal}
        updatedUser={selectedUser}
       handleInputChange={(e) => setSelectedUser({ ...selectedUser, [e.target.id]: e.target.value })}
        handleUpdateUser={handelUpdateUser}
      />
    </div>
  );
}

export default UserTable;