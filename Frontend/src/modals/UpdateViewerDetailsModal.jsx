import React, { useState, useEffect } from 'react';
import './UpdateViewerDetailsModal.css';
import InputField from '../components/InputField';

const UpdateViewerDetailsModal = ({
  currentCustomer,
  setOpenUpdateDetailsModal,
  handleUpdateDetails,
}) => {
  const [formData, setFormData] = useState({
    emailAddress: currentCustomer?.Email_Address || '',
    modelType: currentCustomer?.Model_Type || '',
    stageName: currentCustomer?.Stage_Name || '',
    modelInstaLink: currentCustomer?.Model_Insta_Link || '',
    // notes: '',
    // noteDate: '',
  });

  // Fetch customer data when the modal opens
  // Update state when the currentCustomer changes
  useEffect(() => {
    if (currentCustomer) {
      setFormData({
        emailAddress: currentCustomer.Email_Address || '',
        modelType: currentCustomer.Model_Type || '',
        stageName: currentCustomer.Stage_Name || '',
        modelInstaLink: currentCustomer.Model_Insta_Link || '',
      });
    }
  }, [currentCustomer]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await handleUpdateDetails(formData);
  };

  return (
    <div
      className='updateViewerDetailsModal-bg'
      onClick={() => setOpenUpdateDetailsModal(false)}
    >
      <div
        className='updateViewerDetailsModal-container'
        onClick={(e) => e.stopPropagation()}
      >
        <i
          onClick={() => setOpenUpdateDetailsModal(false)}
          className='fa-regular fa-circle-xmark cross'
        ></i>
        <form className='updateForm' onSubmit={handleSubmit}>
          <div className='input-labels'>
            <InputField
              label='Model Type'
              type='text'
              name='modelType'
              value={formData.modelType}
              onChange={handleChange}
            />
            <InputField
              label='Stage Name'
              type='text'
              name='stageName'
              value={formData.stageName}
              onChange={handleChange}
            />
            <InputField
              label='Model Insta Link'
              type='text'
              name='modelInstaLink'
              value={formData.modelInstaLink}
              onChange={handleChange}
            />
            <InputField
              label='Email Address'
              type='email'
              name='emailAddress2'
              value={formData.emailAddress}
              onChange={handleChange}
            />
            {/* <InputField
              label='Notes'
              type='text'
              name='notes' // New field
              value={formData.notes}
              onChange={handleChange}
            />
            <InputField
              label='Note Date'
              type='date'
              name='noteDate' // New field
              value={formData.noteDate}
              onChange={handleChange}
            /> */}
          </div>
          <button type='submit' className='updateBtn'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateViewerDetailsModal;