import React from "react";
import { Card, Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Filter, Plus, Eye, Pencil, Trash } from 'react-bootstrap-icons';
import categoryimg1 from '../../assets/images/story1.png'


const UnpublishedStory = () => {
  
    const handleView = (storyId) => {
        console.log(`Viewing story with ID: ${storyId}`);
        
    };

    const handleEdit = (storyId) => {
        console.log(`Editing story with ID: ${storyId}`);
        
    };

    const handleDelete = (storyId) => {
        console.log(`Deleting story with ID: ${storyId}`);
       
    };

    return (
        <>
            <div className="d-flex justify-content-center" style={{ padding: '2rem' }}>
                <Card className="custom-card-style" style={{ width: '100%', maxWidth: '85rem' }}>
                    <div className="custom-btn-container d-flex justify-content-end align-items-center p-3 w-100">
                        <Button variant="outline-primary" size="sm" className="me-3 custom-btn">
                            <Filter className="me-2" /> Filter
                        </Button>
                        <Button variant="primary" size="sm" className="me-3 custom-btn">
                            <Plus className="me-2" /> Add New Story
                        </Button>
                        <div className="d-flex justify-content-center" style={{ flexGrow: 1 }}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                style={{ width: '130px' }} 
                                className="me-3"
                            />
                        </div>
                    </div>
                    <hr />

                    <div className="table-responsive">
                        <Table bordered className="mx-auto">
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#f8f9fa' }}>Image</th>
                                    <th style={{ backgroundColor: '#f8f9fa' }}>Story Name</th>
                                    <th style={{ backgroundColor: '#f8f9fa' }}>Status</th>
                                    <th style={{ backgroundColor: '#f8f9fa' }}>Active / Inactive</th>
                                    <th style={{ backgroundColor: '#f8f9fa' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((id) => (
                                    <tr key={id}>
                                        <td>
                                            <img
                                                src={categoryimg1}
                                                alt="Published Story"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td>Lorem Ipsum Neque porro qui dolorem</td>
                                        <td>Un-Published</td>
                                        <td>
                                           
                                            <Form.Check
                                                type="switch"
                                                id={`custom-switch-${id}`}
                                                defaultChecked={id % 2 === 0}
                                                custom
                                            />
                                        </td>
                                        <td className="d-flex justify-content-around">
                                           
                                            <Button variant="outline-primary" size="sm" onClick={() => handleView(id)}>
                                                <Eye />
                                            </Button>
                                            <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(id)} className="mx-2">
                                                <Pencil />
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(id)}>
                                                <Trash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default UnpublishedStory;
