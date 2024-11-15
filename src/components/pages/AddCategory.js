import React, { useState } from 'react';
import '../styles/addCategories.css';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    categoryImage: null,
    categoryName: '',
  });
  const [errors, setErrors] = useState({
    categoryImage: '',
    categoryName: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "categoryImage") {
      setFormData({ ...formData, categoryImage: files[0] });
      setErrors({ ...errors, categoryImage: files[0] ? '' : 'Please choose a file.' });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, categoryName: value ? '' : 'Category name is required.' });
    }
  };

  const handleReset = () => {
    setFormData({
      categoryImage: null,
      categoryName: '',
    });
    setErrors({
      categoryImage: '',
      categoryName: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { categoryImage: '', categoryName: '' };

    if (!formData.categoryImage) {
      newErrors.categoryImage = 'Please choose a file.';
      valid = false;
    }
    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Category Image:", formData.categoryImage);
      console.log("Category Name:", formData.categoryName);
    }
  };

  return (
    <div className="mx-md-4 mx-1 mt-5 add-category rounded-2">
      <div className="row justify-content-center">
        <div className="col-xxl-6 col-md-6">
          <div className="card py-4">
            <div className="text-center">
              <h5 className="card-title mb-0">Add Category</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Add Image</label>
                  <div className={`input-group align-items-center ${errors.categoryImage ? 'is-invalid' : ''}`}>
                    <button
                      type="button"
                      className="btn browser-btn"
                      onClick={() => document.getElementById('categoryImage').click()}
                    >
                      Browse
                    </button>
                    <input
                      type="file"
                      id="categoryImage"
                      name="categoryImage"
                      onChange={handleInputChange}
                      className="d-none "
                      required
                    />
                    {formData.categoryImage && (
                      <span className="ms-2">{formData.categoryImage.name}</span>
                    )}
                  </div>
                  {errors.categoryImage && (
                    <div className="invalid-feedback d-block">{errors.categoryImage}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    className={`form-control py-3 ${errors.categoryName ? 'is-invalid' : ''}`}
                    placeholder="Enter Category Name"
                    value={formData.categoryName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.categoryName && (
                    <div className="invalid-feedback">{errors.categoryName}</div>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleReset}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Category
                  </button>
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
