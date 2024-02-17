import React from "react";
import Button from "../components/Button";


function AddUserModal({ isModalOpen, handleCloseModal, handleInputChange, newUserData, handleAddUser }) {
 
  return (
      isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
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
            <Button className="add-button" onClick={handleAddUser}>Add</Button>
          </div>
        </div>
      )
    );
  }

  export default AddUserModal;

