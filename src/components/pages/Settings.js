import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';

const ProfileUpdate = () => {
  return (
  <div className=''>
       <div className='mx-4 mt-5'>
        <h4>Settings</h4>
        <h6>Profile</h6>
       </div>
      <div className="mx-4 bg-white py-4">
      <Form>
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
              <FaCamera size={60} color="#6c757d" />
            </Form.Label>
            <Form.Control type="file" id="uploadPhoto" className="d-none" />
          </div>
        </div>
        <h6 className='text-center text-primary mb-4'>Upload/Change Photo</h6>


        {/* Username and Current Password */}
        <Row className="mb-3 justify-content-center">
          <Col md={4}>
            <Form.Group controlId="formUsername" className="floating-label-group">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                className="form-control form-control-sm bg-light py-2"
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="formCurrentPassword" className="floating-label-group">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                className="form-control form-control-sm bg-light py-2"
                required
              />
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
                className="form-control form-control-sm bg-light py-2"
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="formReenterNewPassword" className="floating-label-group">
              <Form.Label>Re-enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter new password"
                className="form-control form-control-sm bg-light py-2"
                required
              />
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
