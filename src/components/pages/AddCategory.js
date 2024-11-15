import React from 'react';
import { Link } from 'react-router-dom';

const AddCategory = () => {
  return (
    <div className="dashboard-main-body">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <h6 className="fw-semibold mb-0">Add Category</h6>
      </div>
      <div className="mb-40">
        <div className="col-xxl-6 col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0 text-center">Add Category</h5>
            </div>
            <div className="card-body">
              <form className="row gy-3 needs-validation" noValidate>
                <div className="col-md-12">
                  <label className="form-label">Add Image</label>
                  <input className="form-control" type="file" name="categoryImage" required />
                  <div className="invalid-feedback">
                    Please choose a file.
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Category name</label>
                  <input type="text" name="categoryName" className="form-control" required placeholder="Enter Category Name" />
                  <div className="valid-feedback">
                    Looks good!
                  </div>
                </div>
                <div className="col-12 d-flex gap-3">
                  <Link to="/categories" className="btn btn-outline-primary radius-8 px-20 py-11">Cancel</Link>
                  <button className="btn btn-primary" type="submit">Add Category</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
