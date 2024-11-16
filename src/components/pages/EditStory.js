import React from 'react';

const SeoElements = () => {
  return (
    <div className="row gy-4 mb-4">
      {/* <h3>Create Stories</h3> */}
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">SEO ELEMENTS</h5>
          </div>
          <div className="card-body">
            <div className="row gy-3">
              <div className="col-6">
                <label className="form-label">Title Text</label>
                <input type="text" className="form-control" placeholder="Short Title" />
              </div>
              {/* <div className="col-md-6">
                <label className="form-label">Add Cover Image</label>
                <input type="file" className="form-control" required />
                <div className="invalid-feedback">Please choose a file.</div>
              </div> */}


             <div className="col-6">
                <label className="form-label">Category</label>
                <select className="form-control form-select">
                  <option>Select Category</option>
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                  <option>Category 4</option>
                  <option>Category 5</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="4" placeholder="Enter a Description..."></textarea>
              </div>
              <div className="col-lg-6">
                <label className="form-label">Schema</label>
                <textarea className="form-control" rows="4" placeholder="Enter Schema..."></textarea>
              </div>
              <div className="col-6">
                <label className="form-label">URL</label>
                <input type="text" className="form-control" placeholder="Enter URL" />
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryCard = ({ storyTitle }) => {
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{storyTitle}</h5>
        </div>
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-md-12">
              <label className="form-label">Add Image</label>
              <input type="file" className="form-control" required />
              <div className="invalid-feedback">Please choose a file.</div>
            </div>
            <div className="col-12">
              <label className="form-label">Title Text</label>
              <input type="text" className="form-control" placeholder="Short Title" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" placeholder="Short Description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmissionSection = () => {
  return (
    <div className="col-md-12 mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-12">
              <select className="form-control form-select">
                <option>Published / Un-Published</option>
                <option>Published</option>
                <option>Un-Published</option>
              </select>
            </div>
            <div className="col-12 text-center">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <button type="button" className="btn btn-lg btn-primary radius-8 px-4 py-2">Preview</button>
                <button type="button" className="btn btn-lg btn-outline-success radius-8 px-4 py-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Addtstory = () => {
  return (
    <div className="container my-4">
     
      <div className="row gy-4">
        {['Story 1', 'Story 2', 'Story 3', 'Story 4', 'Story 5'].map((title, index) => (
          <StoryCard key={index} storyTitle={title} />
        ))}
      </div>
      <SeoElements />
      <SubmissionSection />
    </div>
  );
};

export default Addtstory;
