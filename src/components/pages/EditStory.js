import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
  const [category, setCategory] = useState("");

  const [url, setUrl] = useState("");
  const [files, setFiles] = useState([]);


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; 
      return isValidType && isValidSize;
    });
  
    if (validFiles.length !== selectedFiles.length) {
      toast.error("Some files are invalid. Only JPEG, PNG, or WebP under 5MB are allowed.");
    }
  
    setFiles(validFiles);
  };
  


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
    fetch("https://www.medicoverhospitals.in/apis/get_story?storyid=1001", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const urlPattern = /^(https?:\/\/)?([a-z0-9]+[.]){1,2}[a-z]{2,5}(\/[^\s]*)?$/i;
    if (!urlPattern.test(url)) {
      toast.error("Please enter a valid URL");
      return;
    }
  
    if (files.length === 0) {
      toast.error("Please select at least one file!");
      return;
    }
  
    const formData = new FormData();
  
    formData.append("seoTitle", seoTitle);
    formData.append("seoDescription", seoDescription);
    formData.append("storyId", storyId);
    formData.append("status", status);
    formData.append("category", category);
    formData.append("url", url);
  
   
    stories.forEach((story, index) => {
      if (files[index]) {
        formData.append(`img${index + 1}`, files[index]); 
      }
      formData.append(`img${index + 1}t`, story.title); 
      formData.append(`img${index + 1}d`, story.description); 
    });
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  
    try {
      const response = await axios.post(
        "https://www.medicoverhospitals.in/apis/webstorysingle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error uploading stories. Please try again."
      );
    }
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
                      multiple
                      onChange={handleFileChange}
                    />
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
                    name="seoTitle"
                    placeholder="SEO Title"
                    value={seoTitle}
                    onChange={(e) => handleSeoInputChange(e, "seoTitle")}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Category 1">Category 1</option>
                    <option value="Category 2">Category 2</option>
                    <option value="Category 3">Category 3</option>
                  </select>
                </div>
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

                <div className="col-lg-6">
                  <label className="form-label">URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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


      <div className="text-center mt-4">
        <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddStory;
