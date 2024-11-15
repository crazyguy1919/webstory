import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

const ProfileUpdate = () => {
  // State to manage form data and validation errors
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    reenterNewPassword: '',
    photo: null,
  });

  const [errors, setErrors] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    reenterNewPassword: '',
  });

  // State to manage the uploaded photo
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result); // Set the uploaded image to be shown
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { username: '', currentPassword: '', newPassword: '', reenterNewPassword: '' };

    // Remove spaces from username and validate
    const cleanedUsername = formData.username.replace(/\s+/g, '');

    // Username validation
    if (!cleanedUsername.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    } else if (cleanedUsername.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(cleanedUsername)) {
      newErrors.username = 'Username must only contain letters (spaces are ignored).';
      valid = false;
    }

    // Current Password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required.';
      valid = false;
    }

    // New Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required.';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long.';
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one special character.';
      valid = false;
    }

    // Re-enter New Password validation
    if (formData.reenterNewPassword !== formData.newPassword) {
      newErrors.reenterNewPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);

    // If form is valid, perform the update logic
    if (valid) {
      console.log("Form Data:", formData);
      // Perform update logic (e.g., API call)
    }
  };

  return (
    <div>
      <div className="mx-4 mt-5">
        <h4>Settings</h4>
        <h6>Profile</h6>
      </div>
      <div className="mx-4 bg-white py-4">
        <Form onSubmit={handleSubmit}>
          {/* Upload/Change Photo */}
          <div className="d-flex justify-content-center">
            <div className="position-relative">
              <Form.Label
                htmlFor="uploadPhoto"
                className="d-flex justify-content-center align-items-center rounded-circle bg-light"
                style={{
                  width: '120px',
                  height: '120px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {uploadedPhoto ? (
                  <img
                    src={uploadedPhoto}
                    alt="Uploaded"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <FaCamera size={60} color="#6c757d" />
                )}
              </Form.Label>
              <Form.Control
                type="file"
                id="uploadPhoto"
                name="photo"
                className="d-none"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <h6 className="text-center text-primary mb-4">Upload/Change Photo</h6>

          {/* Username and Current Password */}
          <Row className="mb-3 justify-content-center">
            <Col md={4}>
              <Form.Group controlId="formUsername" className="floating-label-group">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  className={`form-control form-control-sm bg-light py-2 ${errors.username ? 'is-invalid' : ''}`}
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formCurrentPassword" className="floating-label-group">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  className={`form-control form-control-sm bg-light py-2 ${errors.currentPassword ? 'is-invalid' : ''}`}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
              </Form.Group>
            </Col>
          </Row>

          {/* New Password and Re-enter New Password */}
          <Row className="mb-3 justify-content-center">
            <Col md={4}>
              <Form.Group controlId="formNewPassword" className="floating-label-group">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  className={`form-control form-control-sm bg-light py-2 ${errors.newPassword ? 'is-invalid' : ''}`}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formReenterNewPassword" className="floating-label-group">
                <Form.Label>Re-enter New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-enter new password"
                  className={`form-control form-control-sm bg-light py-2 ${errors.reenterNewPassword ? 'is-invalid' : ''}`}
                  name="reenterNewPassword"
                  value={formData.reenterNewPassword}
                  onChange={handleInputChange}
                  required
                />
                {errors.reenterNewPassword && <div className="invalid-feedback">{errors.reenterNewPassword}</div>}
              </Form.Group>
            </Col>
          </Row>

          {/* Update Button */}
          <div className="text-center">
            <Button variant="primary" type="submit" className="mt-3">
              Update Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
