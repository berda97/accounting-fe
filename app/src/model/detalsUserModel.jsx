import React from 'react';
import Button from '../components/Button';


function UserDetailsModel({ selectedUser, handleOpenUpdateModal, deleteResponse, handleCloseOptions }) {

    if (!selectedUser) {
        return null;
    }
    return (
        <div className="right-side-form">
            <h2>User Details</h2>
            <p>ID: {selectedUser.id}</p>
            <p>First Name: {selectedUser.firstName}</p>
            <p>Last Name: {selectedUser.lastName}</p>
            <p>Address: {selectedUser.address}</p>
            <p>Salary: {selectedUser.salary}</p>
            <p>Currency: {selectedUser.currency}</p>
            <p>Position: {selectedUser.position}</p>
            <Button className='update-button' onClick={handleOpenUpdateModal}>Update</Button>
            <Button className='delete-button' onClick={() => deleteResponse(selectedUser.id)}>Delete Users</Button>
            <Button className='close-button' onClick={handleCloseOptions}>Close Options</Button>
        </div>
    );
}

export default UserDetailsModel;