import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import srory12 from '../../assets/images/story1.png'

const TableRow = ({ story, onStatusChange }) => {
  return (

    
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img src={story.image} alt="" className="w-40-px h-40-px flex-shrink-0 me-12 overflow-hidden" />
        </div>
      </td>
      <td>{story.name}</td>
      <td>{story.status}</td>
      <td className="text-center">
        <div className="form-switch switch-success d-flex align-items-center gap-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={story.isActive}
            onChange={() => onStatusChange(story.id)}
          />
        </div>
      </td>
      <td className="text-center">
        <div className="d-flex align-items-center gap-10 justify-content-center">
          <button type="button" className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center">
            <Icon icon="majesticons:eye-line" className="icon text-xl" />
          </button>
          <button type="button" className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center">
            <Icon icon="lucide:edit" className="menu-icon" />
          </button>
          <button type="button" className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center">
            <Icon icon="fluent:delete-24-regular" className="menu-ico" />
          </button>
        </div>
      </td>


      
      
    </tr>
  );
};

const Table = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    },
    {
      id: 1,
      image: srory12,
      name: 'Lorem Ipsum Neque porro qui dolorem',
      status: 'Un-Published',
      isActive: true,
    }

    // Add more stories as needed
  ]);

  const handleStatusChange = (id) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id ? { ...story, isActive: !story.isActive } : story
      )
    );
  };

  return (
    <div className="card-body m-3">
      <div className="table-responsive scroll-sm">
        <table className="table bordered-table sm-table mb-0">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Story Name</th>
              <th scope="col">Status</th>
              <th scope="col">Active / Inactive</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <TableRow key={story.id} story={story} onStatusChange={handleStatusChange} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
