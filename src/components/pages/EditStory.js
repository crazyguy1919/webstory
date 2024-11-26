import React, { useState, useEffect } from "react";

const AddStory = () => {
  const [singlestorydata, setsinglestorydata] = useState("");

  const [stories, setStories] = useState([
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
  ]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, index, field) => {
    const updatedStories = [...stories];
    updatedStories[index][field] = field === "image" ? e.target.files[0] : e.target.value;
    setStories(updatedStories);
  };
let thestoryidis = 1732610574073
  useEffect(() => {
    fetch(`https://www.medicoverhospitals.in/apis/get_story?storyid=${thestoryidis}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const fetchedData = data.data;

        // Map API data to state
        setsinglestorydata(fetchedData);

        // Set SEO fields
        setSeoTitle(fetchedData.title || "");
        setSeoDescription(fetchedData.description || "");
        setCategory(fetchedData.category || "");
        setUrl(fetchedData.url || "");

        // Map images and their respective titles and descriptions into stories
        setStories([
          {
            image: null,
            title: fetchedData.img1t || "",
            description: fetchedData.img1d || "",
          },
          {
            image: null,
            title: fetchedData.img2t || "",
            description: fetchedData.img2d || "",
          },
          {
            image: null,
            title: fetchedData.img3t || "",
            description: fetchedData.img3d || "",
          },
          {
            image: null,
            title: fetchedData.img4t || "",
            description: fetchedData.img4d || "",
          },
          {
            image: null,
            title: fetchedData.img5t || "",
            description: fetchedData.img5d || "",
          },
        ]);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate Stories
    stories.forEach((story, index) => {
      if (!story.title) {
        validationErrors[`storyTitle${index}`] = "Title is required.";
      }
      if (!story.description) {
        validationErrors[`storyDescription${index}`] = "Description is required.";
      }
      if (!story.image) {
        validationErrors[`storyImage${index}`] = "Image is required.";
      }
    });

    // Validate SEO Title
    if (!seoTitle) {
      validationErrors.seoTitle = "SEO Title is required.";
    }

    // Validate SEO Description
    if (!seoDescription) {
      validationErrors.seoDescription = "SEO Description is required.";
    }

    // Validate Category
    if (!category) {
      validationErrors.category = "Category is required.";
    }

    // Validate URL
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+[.]){1,2}[a-z]{2,5}(\/[^\s]*)?$/i;
    if (!url) {
      validationErrors.url = "URL is required.";
    } else if (!urlPattern.test(url)) {
      validationErrors.url = "Please enter a valid URL.";
    }

    // Set errors if any
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please correct the highlighted errors.");
      return;
    }

    // Clear errors and proceed
    setErrors({});
    alert("Form submitted successfully!");
    console.log("Form Data:", { stories, seoTitle, seoDescription, category, url });
  };

  return (
    <div className="container my-4">
      <h3>Edit Stories</h3>
      <div className="row">
        {stories.map((story, index) => (
          <div key={index} className="col-12 mb-4">
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
                      onChange={(e) => handleInputChange(e, index, "image")}
                    />
                    {errors[`storyImage${index}`] && (
                      <small className="text-danger">{errors[`storyImage${index}`]}</small>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Title Text</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Title"
                      value={story.title}
                      onChange={(e) => handleInputChange(e, index, "title")}
                    />
                    {errors[`storyTitle${index}`] && (
                      <small className="text-danger">{errors[`storyTitle${index}`]}</small>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Description"
                      value={story.description}
                      onChange={(e) => handleInputChange(e, index, "description")}
                    />
                    {errors[`storyDescription${index}`] && (
                      <small className="text-danger">{errors[`storyDescription${index}`]}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row gy-4 mb-4">
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
                    placeholder="SEO Title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                  />
                  {errors.seoTitle && <small className="text-danger">{errors.seoTitle}</small>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                    <option value="Category 3">Category 3</option>
                  </select>
                  {errors.category && <small className="text-danger">{errors.category}</small>}
                </div>
                <div className="col-lg-6">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="SEO Description"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                  ></textarea>
                  {errors.seoDescription && (
                    <small className="text-danger">{errors.seoDescription}</small>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="form-label">URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  {errors.url && <small className="text-danger">{errors.url}</small>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddStory;
