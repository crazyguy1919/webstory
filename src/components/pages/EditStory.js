import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStory = () => {
  const [stories, setStories] = useState([
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
    { image: null, title: "", description: "" },
  ]);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [storyId, setStoryId] = useState("");
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState('');

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    const selectedCategory = e.target.value;
  

    if (selectedCategory === "Category 1") {
      setStatus("inactive");
    } 

    else if (selectedCategory === "Category 2") {
      setStatus("active");
    }
  };
  
  

  useEffect(() => {
    fetch('https://www.medicoverhospitals.in/apis/get_story?storyid=1001', {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "success" && data.data) {
          const fetchedData = data.data;
          setStoryId(fetchedData.storyid);
          const updatedStories = [
            { image: fetchedData.img1 || null, title: fetchedData.img1t || "", description: fetchedData.img1d || "" },
            { image: fetchedData.img2 || null, title: fetchedData.img2t || "", description: fetchedData.img2d || "" },
            { image: fetchedData.img3 || null, title: fetchedData.img3t || "", description: fetchedData.img3d || "" },
            { image: fetchedData.img4 || null, title: fetchedData.img4t || "", description: fetchedData.img4d || "" },
            { image: fetchedData.img5 || null, title: fetchedData.img5t || "", description: fetchedData.img5d || "" },
          ];
          setStories(updatedStories);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedStories = [...stories];
    updatedStories[index].image = file;

    if (file && file.type.startsWith("image/")) {
      updatedStories[index].imagePreview = URL.createObjectURL(file);
    }

    setStories(updatedStories);
  };

  const handleInputChange = (e, index, field) => {
    const updatedStories = [...stories];
    updatedStories[index][field] = e.target.value;
    setStories(updatedStories);
  };

  const handleSeoInputChange = (e, field) => {
    if (field === "seoTitle") {
      setSeoTitle(e.target.value);
    } else if (field === "seoDescription") {
      setSeoDescription(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const urlPattern = /^(https?:\/\/)?([a-z0-9]+[.]){1,2}[a-z]{2,5}(\/[^\s]*)?$/i;

    if (!urlPattern.test(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError(''); 

 
  
  

    const payload = {
      storyid: storyId,
      status: status,
      // url: url || "",
      // category: category || "",
      title: seoTitle || "Default SEO Title",
      description: seoDescription || "Default SEO Description",
      img1: stories[0]?.image ? stories[0].image.name : "",
      img1t: stories[0]?.title || "",
      img1d: stories[0]?.description || "",
      img2: stories[1]?.image ? stories[1].image.name : "",
      img2t: stories[1]?.title || "",
      img2d: stories[1]?.description || "",
      img3: stories[2]?.image ? stories[2].image.name : "",
      img3t: stories[2]?.title || "",
      img3d: stories[2]?.description || "",
      img4: stories[3]?.image ? stories[3].image.name : "",
      img4t: stories[3]?.title || "",
      img4d: stories[3]?.description || "",
      img5: stories[4]?.image ? stories[4].image.name : "",
      img5t: stories[4]?.title || "",
      img5d: stories[4]?.description || "",
    };
  
    console.log("Submitting payload:", payload);

  
    toast.success('Data submitted successfully');
  

    fetch("https://www.medicoverhospitals.in/apis/webstory_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("HTTP error:", response.status, response.statusText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        if (data.status === "success") {
          toast.success("Stories updated successfully!");
        } else {
          toast.error("Failed to update stories: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting stories:", error);
        toast.error("There was an error while submitting your stories.");
      });
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
                  {/* Add Image */}
                  <div className="col-md-4">
                    <label className="form-label">Add Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                    {story.image && (
                      <div className="mt-2">
                        <strong>Selected File:</strong>{" "}
                        {typeof story.image === "string"
                          ? story.image
                          : story.image.name}
                      </div>
                    )}
                    {story.image && typeof story.image === "object" && story.imagePreview && (
                      <img
                        src={story.imagePreview}
                        alt={`Story ${index + 1}`}
                        style={{ width: "100%", height: "auto", marginTop: "10px" }}
                      />
                    )}
                  </div>

                  {/* Title Text */}
                  <div className="col-md-4">
                    <label className="form-label">Title Text</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Title"
                      value={story.title}
                      onChange={(e) => handleInputChange(e, index, "title")}
                    />
                  </div>

                  {/* Description */}
                  <div className="col-md-4">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Short Description"
                      value={story.description}
                      onChange={(e) =>
                        handleInputChange(e, index, "description")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEO Elements */}
      <div className="row gy-4 mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">SEO ELEMENTS</h5>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                {/* Title */}
                <div className="col-6">
                  <label className="form-label">Title Text</label>
                  <input
                    type="text"
                    className="form-control"
                    name="seoTitle"
                    placeholder="SEO Title"
                    value={seoTitle}
                    onChange={(e) => handleSeoInputChange(e, "seoTitle")}
                  />
                </div>
                {/* Category */}
                <div className="col-md-6">
              <label className="form-label">Category</label>
                <select
                  className="form-control form-select"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                  <option value="Category 4">Category 4</option>
                  <option value="Category 5">Category 5</option>
                </select>
              </div>
              {/* Description */}
                <div className="col-lg-6">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="seoDescription"
                    rows="4"
                    placeholder="SEO Description"
                    value={seoDescription}
                    onChange={(e) => handleSeoInputChange(e, "seoDescription")}
                  ></textarea>
                </div>
                {/* Schema */}
                <div className="col-lg-6">
                <label className="form-label">Schema</label>
                <textarea
                  className="form-control"
                  name="seoSchema"
                  rows="4"
             
                  placeholder="Enter Schema..."
                ></textarea>
              </div>
              {/* Url */}
              <div className="col-lg-6">
                <label className="form-label">URL</label>
                <input type="url"
                 className="form-control"
                 name="url"
                placeholder="Enter URL" 
                value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Select Story */}
      <div className="col-md-12">
      <label className="form-label">Select Story </label>
      <select
  className="form-control form-select"
  name="category"
  onChange={handleStatusChange}
>
  <option value="">Select Category</option>
  <option value="Category 1">Published Story</option>
  <option value="Category 2">Un-Published Story</option>

</select>
    </div>

{/* Submit */}
      <div className="text-center mt-4">
        <button className="btn btn-outline-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddStory;
