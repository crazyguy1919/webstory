import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Addstory() {
  // Initial state with one story field
  const [stories, setStories] = useState([{ file: null, title: '', description: '' }]);
  const [seo, setSeo] = useState({
    stitle: '',
    sdec: '',
    sschema: '',
    scategory: '',
    surl: '',
  });

  // Function to handle adding new story fields
  const handleAddStory = () => {
    if (stories.length < 5) {
      setStories([...stories, { file: null, title: '', description: '' }]);
    }
  };

  // Handle file, title, and description change
  const handleInputChange = (event, index, field) => {
    const updatedStories = [...stories];
    updatedStories[index][field] = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    setStories(updatedStories);
  };

  // Handle SEO field changes
  const handleSeoChange = (event) => {
    setSeo({ ...seo, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all story fields are filled
    if (stories.some((story) => !story.file || !story.title || !story.description)) {
      alert('Please fill all fields for stories!');
      return;
    }

    // Check if all SEO fields are filled
    if (Object.values(seo).some((value) => !value)) {
      alert('Please fill all SEO fields!');
      return;
    }

    // Create FormData to send
    const formData = new FormData();
    stories.forEach((story, index) => {
      formData.append(`img${index + 1}`, story.file);
      formData.append(`img${index + 1}t`, story.title);
      formData.append(`img${index + 1}d`, story.description);

    });

    // Add SEO fields to FormData
    Object.entries(seo).forEach(([key, value]) => {
      formData.append(key, value);
      
    });
    formData.append('user','shankar');


    try {
      const response = await fetch('https://www.medicoverhospitals.in/apis/webstorysingle', {
        method: 'POST',
        body: formData,
          

      
        

      });
      const data = await response.json();

      if (data.success) {
        alert('Stories and SEO details uploaded successfully!');
        
        console.log(data);
      } else {
        alert('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };























  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add Stories</h2>
      <form onSubmit={handleSubmit}>
        {stories.map((story, index) => (
          <div className="mb-3" key={index}>
            <h4>Story {index + 1}</h4>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Image {index + 1}</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleInputChange(e, index, 'file')}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={story.title}
                  onChange={(e) => handleInputChange(e, index, 'title')}
                  placeholder="Enter Title"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={story.description}
                  onChange={(e) => handleInputChange(e, index, 'description')}
                  placeholder="Enter Description"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Story Button */}
        {stories.length < 5 && (
          <div className='text-center'>
            <button type="button" className="btn btn-primary mb-3 " onClick={handleAddStory}>
            Add Story
          </button>
          </div>
        )}

        {/* SEO Fields */}
        <h4>SEO Elements</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Title Text</label>
            <input
              type="text"
              className="form-control"
              name="stitle"
              value={seo.stitle}
              onChange={handleSeoChange}
              placeholder="Enter Title Text"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="scategory"
              value={seo.scategory}
              onChange={handleSeoChange}
            >
              <option value="">Select Category</option>
              <option value="health">Health</option>
              <option value="fitness">Fitness</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="sdec"
              value={seo.sdec}
              onChange={handleSeoChange}
              placeholder="Enter a Description..."
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Schema</label>
            <input
              type="text"
              className="form-control"
              name="sschema"
              value={seo.sschema}
              onChange={handleSeoChange}
              placeholder="Enter Schema..."
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-12">
            <label className="form-label">URL</label>
            <input
              type="text"
              className="form-control"
              name="surl"
              value={seo.surl}
              onChange={handleSeoChange}
              placeholder="Enter URL"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Addstory;
