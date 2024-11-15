import React, { useState } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Filter, Plus, Eye, Pencil, Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'
import categoryimg1 from '../../assets/images/story1.png'
import '../styles/PublishedStory.css';


const UnpublishedStory = () => {
    const [stories, setStories] = useState([1, 2, 3, 4]); 
    const totalStories = 78;
  
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
                            <Plus className="me-2" /> 
                            <Link to='/add-story' className="custom-btn1">Add New Story</Link>
                            
                            
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
                                    <th className="pubtb">Image</th>
                                    <th className="pubtb">Story Name</th>
                                    <th className="pubtb">Status</th>
                                    <th className="pubtb">Active / Inactive</th>
                                    <th className="pubtb">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((id) => (
                                    <tr key={id}>
                                        <td className="pubtb">
                                            <img
                                                src={categoryimg1}
                                                alt="Published Story"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td className="pubtb">Lorem Ipsum Neque porro qui dolorem</td>
                                        <td className="pubtb">Un-Published</td>
                                        <td className="pubtb">
                                           
                                            <Form.Check
                                                type="switch"
                                                id={`custom-switch-${id}`}
                                                defaultChecked={id % 2 === 0}
                                                custom
                                                className="text-center custom-switch"
                                            />
                                        </td>
                                        <td className="d-flex justify-content-around pubtb">
                                           
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

                    <div className="d-flex justify-content-between align-items-center p-3">
                        <span>Showing 1-{stories.length} of {totalStories}</span>
                        <div className="pagination-buttons">
                            <Button variant="outline-primary" size="sm">{"<"}</Button>
                            <Button variant="outline-primary" size="sm">{">"}</Button>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    );
};

export default UnpublishedStory;
