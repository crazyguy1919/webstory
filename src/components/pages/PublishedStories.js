import React, { useState } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Filter, Plus, Eye, Pencil, Trash } from 'react-bootstrap-icons';  
import categoryimg1 from '../../assets/images/category2.png'
import { Link } from 'react-router-dom'
import '../styles/PublishedStory.css';

const PublishedStory = () => {
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

                    <div className="table-responsive cutsom-table mt-2 mx-4">
                        <Table className="mx-auto table m-0">
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
                                        <td className="pubtb img">
                                            <img
                                                src={categoryimg1}
                                                alt="Published Story"
                                            />
                                        </td>
                                        <td className="pubtb">Lorem Ipsum Neque porro qui dolorem</td>
                                        <td className="pubtb">Published</td>
                                        <td className="pubtb">
                                           
                                            <Form.Check
                                                type="switch"
                                                id={`custom-switch-${id}`}
                                                defaultChecked={id % 2 === 0}
                                                custom
                                                className="custom-switch"
                                            />
                                        </td>
                                        <td className="justify-content-around pubtb">
                                           <div className="d-flex">
                                                <Button variant="outline-primary" className="rounded-0 view" size="sm" onClick={() => handleView(id)}>
                                                    <Eye />
                                                </Button>
                                                <Button variant="outline-secondary" size="sm" onClick={() => handleEdit(id)} className="mx-2 edit rounded-0">
                                                    <Pencil />
                                                </Button>
                                                <Button variant="outline-danger" className="rounded-0 delete" size="sm" onClick={() => handleDelete(id)}>
                                                    <Trash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="d-flex justify-content-between paginations align-items-center py-3 px-4">
                        <span>Showing 1-{stories.length} of {totalStories}</span>
                        <div className="pagination-buttons d-flex" style={{gap:'5px'}}>
                            <Button variant="outline-primary" size="sm">{"<"}</Button>
                            <Button variant="outline-primary" size="sm">{">"}</Button>
                        </div>
                    </div>

                </Card>
            </div>
        </>
    );
};

export default PublishedStory;
