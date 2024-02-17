import React from 'react';
import Button from '../components/Button';

function UpdateUsersModel({ isModalOpen, handleCloseModal, updatedUser, handleInputChange, handleUpdateUser }) {
  return (
    isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>&times;</span>
          <h2> Update User</h2>
          <label htmlFor="firstName">Name:</label>
          <input
            type="text"
            id="firstName"
            value={updatedUser.firstName}
            onChange={(e) => handleInputChange(e, "firstName")}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={updatedUser.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={updatedUser.address}
            onChange={(e) => handleInputChange(e, "address")}
          />
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            value={updatedUser.salary}
            onChange={(e) => handleInputChange(e, "salary")}
          />
          <label htmlFor="currency">Currency:</label>
          <input
            type="text"
            id="currency"
            value={updatedUser.currency}
            onChange={(e) => handleInputChange(e, "currency")}
          />
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={updatedUser.position}
            onChange={(e) => handleInputChange(e, "position")}
          />
          <Button className="save-button" onClick={handleUpdateUser}>Save</Button>
        </div>
      </div>
    )
  );
}



export default UpdateUsersModel;