import axiosInstance from '../axiosInstance';


 const deleteUsers = async (userId) =>{
  try {
    await axiosInstance.delete(`https://localhost:7234/api/users/${userId}`);
    console.log('User deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
const addUser = async (newUser) => {
  try {
    const response = await axiosInstance.post('https://localhost:7234/api/users', newUser);
    console.log('User added successfully:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  }
};
const UpdateUser = async (updatedUser) => {
  try {
    const response = await axiosInstance.put('https://localhost:7234/api/users', updatedUser);
    console.log('User updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};


export {deleteUsers,addUser,UpdateUser};
