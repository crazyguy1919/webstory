import React, { useState } from 'react';




const SeoElements = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="row gy-4 mb-4">
      <h3>Create Stories</h3>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">SEO ELEMENTS</h5>
          </div>
          <div className="card-body">
            <div className="row gy-3">
              <div className="col-6">
                <label className="form-label">Title Text</label>
                <input
                  type="text"
                  className="form-control"
                  name="seoTitle"
                  value={formData.seoTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Short Title"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Add Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="coverImage"
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      coverImage: e.target.files[0]?.name || '',
                    }))
                  }
                />
                <div className="invalid-feedback">Please choose a file.</div>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="seoDescription"
                  rows="4"
                  value={formData.seoDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Enter a Description..."
                ></textarea>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Schema</label>
                <textarea
                  className="form-control"
                  name="seoSchema"
                  rows="4"
                  value={formData.seoSchema || ''}
                  onChange={handleInputChange}
                  placeholder="Enter Schema..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const StoryCard = ({ index, storyData, setStoryData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prevData) => {
      const updatedStories = [...prevData];
      updatedStories[index][name] = value;
      return updatedStories;
    });
  };

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Story {index + 1}</h5>
        </div>
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-md-4">
              <label className="form-label">Add Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => {
                  setStoryData((prevData) => {
                    const updatedStories = [...prevData];
                    updatedStories[index].image = e.target.files[0]?.name || '';
                    return updatedStories;
                  });
                }}
              />
              <div className="invalid-feedback">Please choose a file.</div>
            </div>
            <div className="col-md-4">
              <label className="form-label">Title Text</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={storyData[index]?.title || ''}
                onChange={handleInputChange}
                placeholder="Short Title"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={storyData[index]?.description || ''}
                onChange={handleInputChange}
                placeholder="Short Description"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




const SubmissionSection = ({ handleSubmit }) => {
  return (
    <div className="col-md-12 mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-12">
              <button type="button" className="btn btn-lg btn-primary radius-8 px-4 py-2 mx-4">
                Preview
              </button>
              <button type="button" className="btn btn-lg btn-outline-success" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PublishSection = ({ publishStatus, setPublishStatus }) => {
  const handleChange = (e) => setPublishStatus(e.target.value);

  return (
    <div className="col-md-12 my-4">
      <div className="card">
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-12">
              {/* <label className="form-label">Publish/Unpublish</label> */}
              <select
                className="form-control"
                value={publishStatus}
                onChange={handleChange}
              >
                <option value="Unpublished">Unpublished Story</option>
                <option value="Published">Published Story</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Addtstory = () => {
  const [formData, setFormData] = useState({});
  const [stories, setStories] = useState([{ title: '', description: '', image: '' }]);
  const [publishStatus, setPublishStatus] = useState('Unpublished');

  const addStory = () => {
    setStories((prevStories) => [...prevStories, { title: '', description: '', image: '' }]);
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      seoData: formData,
      stories,
      publishStatus,
    };
    console.log('Submitted Data:', dataToSubmit);
  };

  return (
    <div className="container my-4">
      <SeoElements formData={formData} setFormData={setFormData} />
      <div className="row gy-4">
        {stories.map((_, index) => (
          <StoryCard
            key={index}
            index={index}
            storyData={stories}
            setStoryData={setStories}
          />
        ))}
      </div>
      <div className="text-center my-4">
        <button type="button" className="btn btn-outline-primary" onClick={addStory}>
          + Add Story
        </button>
      </div>
      <PublishSection publishStatus={publishStatus} setPublishStatus={setPublishStatus} />
      <SubmissionSection handleSubmit={handleSubmit} />
    </div>
  );
};

export default Addtstory;
