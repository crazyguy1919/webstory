import React, { useState, useEffect } from "react";
import '../styles/addstory.css'





const SeoElements = ({ formData, setFormData, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="row gy-4 mb-4 mt-4">
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
                  className={`form-control ${errors.seoTitle ? "is-invalid" : ""}`}
                  name="seoTitle"
                  value={formData.seoTitle || ""}
                  onChange={handleInputChange}
                  placeholder="Title"
                />
                {errors.seoTitle && (
                  <div className="invalid-feedback">Title is required.</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className={`form-control form-select ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  name="category"
                  value={formData.category || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                  <option value="Category 4">Category 4</option>
                  <option value="Category 5">Category 5</option>
                </select>
                {errors.category && (
                  <div className="invalid-feedback">Category is required.</div>
                )}
              </div>
              <div className="col-lg-6">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${
                    errors.seoDescription ? "is-invalid" : ""
                  }`}
                  name="seoDescription"
                  rows="4"
                  value={formData.seoDescription || ""}
                  onChange={handleInputChange}
                  placeholder="Enter a Description..."
                ></textarea>
                {errors.seoDescription && (
                  <div className="invalid-feedback">
                    Description is required.
                  </div>
                )}
              </div>
              <div className="col-lg-6">
                <label className="form-label">Schema</label>
                <textarea
                  className="form-control"
                  name="seoSchema"
                  rows="4"
                  value={formData.seoSchema || ""}
                  onChange={handleInputChange}
                  placeholder="Enter Schema..."
                ></textarea>
              </div>
              <div className="col-lg-6">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  className={`form-control ${errors.url ? "is-invalid" : ""}`}
                  name="url"
                  value={formData.url || ""}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                />
                {errors.url && (
                  <div className="invalid-feedback">URL is required.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const StoryCard = ({ index, storyData, setStoryData, errors }) => {
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
                className={`form-control ${errors[index]?.image ? "is-invalid" : ""}`}
                name="image"
                onChange={(e) => {
                  const fileName = e.target.files[0]?.name || '';
                  const uniquePath = `${new Date().getTime()}-${fileName}`;
                  
                  setStoryData((prevData) => {
                    const updatedStories = [...prevData];
                    updatedStories[index].image = uniquePath;
                    return updatedStories;
                  });
                }}
              />
              {errors[index]?.image && (
                <div className="invalid-feedback">Image is required.</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Title Text</label>
              <input
                type="text"
                className={`form-control ${errors[index]?.title ? "is-invalid" : ""}`}
                name="title"
                value={storyData[index]?.title || ""}
                onChange={handleInputChange}
                placeholder="Title"
              />
              {errors[index]?.title && (
                <div className="invalid-feedback">Title is required.</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Description</label>
              <input
                type="text"
                className={`form-control ${errors[index]?.description ? "is-invalid" : ""}`}
                name="description"
                value={storyData[index]?.description || ""}
                onChange={handleInputChange}
                placeholder="Description"
              />
              {errors[index]?.description && (
                <div className="invalid-feedback">Description is required.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Addtstory = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [storyiesstatus,setStoryiesstatus] = useState(null)
  const [formData, setFormData] = useState({});

  const [userName,setuserName] = useState()

    useEffect(() => {
      setuserName(JSON.parse(sessionStorage.getItem('user')))
       
    }, []);


  const [stories, setStories] = useState([
    { title: "", description: "", image: "" },
  ]);
  const [publishStatus, setPublishStatus] = useState("Unpublished");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.seoTitle) newErrors.seoTitle = true;
    if (!formData.category) newErrors.category = true;
    if (!formData.seoDescription) newErrors.seoDescription = true;
    if (!formData.url) newErrors.url = true;

    const storyErrors = stories.map((story) => ({
      image: !story.image,
      title: !story.title,
      description: !story.description,
    }));
    setErrors({ ...newErrors, stories: storyErrors });
    return Object.keys(newErrors).length === 0 &&
      !storyErrors.some((err) => Object.values(err).some((val) => val));
  };

  const handleSubmit = () => {

    if (validateForm()) {
      const formattedDateTime = new Date().toISOString(); 
      
      const idGenerate = Date.now(); 
  
      const dataToSubmit = {
        seoData: {
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription,
        },
        stories: stories,
      };
  


      console.log('asdfasdfasdf',dataToSubmit.stories[0]?.image)
      fetch("https://www.medicoverhospitals.in/apis/webstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyid: idGenerate,
          img1: dataToSubmit.stories[0]?.image,
          img1t: dataToSubmit.stories[0]?.title,
          img1d: dataToSubmit.stories[0]?.description,
          img2: dataToSubmit.stories[1]?.image,
          img2t: dataToSubmit.stories[1]?.title,
          img2d: dataToSubmit.stories[1]?.description,
          img3: dataToSubmit.stories[2]?.image,
          img3t: dataToSubmit.stories[2]?.title,
          img3d: dataToSubmit.stories[2]?.description,
          img4: dataToSubmit.stories[3]?.image,
          img4t: dataToSubmit.stories[3]?.title,
          img4d: dataToSubmit.stories[3]?.description,
          img5: dataToSubmit.stories[4]?.image,
          img5t: dataToSubmit.stories[4]?.title,
          img5d: dataToSubmit.stories[4]?.description,
          title: dataToSubmit.seoData.seoTitle,
          description: dataToSubmit.seoData.seoDescription,
          time: formattedDateTime,
          user: userName,
          status: publishStatus,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          if(data.status=='error'){
            console.log('adfasdf',data.status)
            dataToSubmit(true)
       
          }
          else{
            setShowAlert(true)
            setTimeout(() => {
              setShowAlert(false); 
            }, 3000);
          }
         
           formData.seoTitle=''
           formData.seoDescription=''

        })
        .catch((error) => {
          console.error("Error:asdfadfsdf", error);
        });
  
      console.log("SEO Data:", dataToSubmit);
      // console.log("Stories Data:", dataToSubmit.stories);
      // console.log("Publish Status:", publishStatus);
      // console.log("User Name:", userName, idGenerate);
    }
  };
  
const closeClick = ()=>{
  setStoryiesstatus(false)
  console.log('heladfasdf',storyiesstatus)
}
  return (
    <div className="container my-4">
      <div className="row gy-4">
        {stories.map((_, index) => (
          <StoryCard
            key={index}
            index={index}
            storyData={stories}
            setStoryData={setStories}
            errors={errors.stories || []}
          />
        ))}
      </div>

     {stories.length<5 && <div className="text-center my-4">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            setStories((prev) => [
              ...prev,
              { title: "", description: "", image: "" },
            ])
          }
        >
          + Add Story {stories.length+1}
        </button>
      </div>}
      <SeoElements formData={formData} setFormData={setFormData} errors={errors} />
      <div className="col-md-12 text-center mt-4">

              <button type="button" className="btn btn-lg btn-primary radius-8 px-4 py-2 mx-4">
                Preview
              </button>
              <button type="button" className="btn btn-lg btn-outline-success" onClick={handleSubmit}>
                Submit
              </button>
      </div>






      {storyiesstatus && 
      <div className="status-error"> 
        <h2 className="close-icon" onClick={closeClick}>x</h2>
        <h1>Please add 5 stories</h1>

      </div>
      }


      { showAlert &&
          <div>
              <h5 className="success-message">
                data successfully submited 
              </h5>
          </div>
      
      }


      
    </div>
  );
};

export default Addtstory;
