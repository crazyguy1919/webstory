import React, { useState,useEffect } from 'react';





const SeoElements = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
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
                  value={formData.seoTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Short Title"
                />
              </div>
              <div className="col-md-6">
                {/* <label className="form-label">Add Cover Image</label>
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
                <div className="invalid-feedback">Please choose a file.</div> */}

          
            

              <label className="form-label">Category</label>
                <select
                  className="form-control form-select"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                  <option value="Category 4">Category 4</option>
                  <option value="Category 5">Category 5</option>
                </select>
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


              <div className="col-lg-6">
                <label className="form-label">URL</label>
                <input type="text"
                 className="form-control"
                 name="url"
                 value={formData.url || ''}
                 onChange={handleInputChange}
                placeholder="Enter URL" />
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

  const [submittedDateTime, setSubmittedDateTime] = useState(null);

  const [userName,setuserName] = useState('')

  const addStory = () => {
    setStories((prevStories) => [...prevStories, { title: '', description: '', image: '' }]);
  };


   useEffect(() => {
    setuserName(JSON.parse(sessionStorage.getItem('user')))
      
    }, [userName]);






  const handleSubmit = () => {


    const idGenerate = Date.now();

    const nowDate = new Date();
    const formattedDateTime = nowDate.toISOString().slice(0, 19).replace("T", " ");
      setSubmittedDateTime(formattedDateTime);
  


    const dataToSubmit = {
      seoData: formData,
      stories,
      publishStatus,  
    };
    





    fetch('https://www.medicoverhospitals.in/apis/webstory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({


    storyid: idGenerate,
    img1: dataToSubmit.stories[0].image,
    img1t: dataToSubmit.stories[0].title,
    img1d: dataToSubmit.stories[0].description,
    img2: dataToSubmit.stories[1].image,
    img2t: dataToSubmit.stories[1].title,
    img2d: dataToSubmit.stories[1].description,
    img3: dataToSubmit.stories[2].image,
    img3t: dataToSubmit.stories[2].title,
    img3d: dataToSubmit.stories[2].description,
    img4: dataToSubmit.stories[3].image,
    img4t: dataToSubmit.stories[3].title,
    img4d: dataToSubmit.stories[3].description,
    img5: dataToSubmit.stories[4].image,
    img5t: dataToSubmit.stories[4].title,
    img5d: dataToSubmit.stories[4].description,

    title: dataToSubmit.seoData.seoTitle,

    description: dataToSubmit.seoData.seoDescription,

    time: formattedDateTime,
    user: userName,
    status: "Unpublished"


      }),
    })

    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); 
    })
    .then((data) => {
      console.log('Success:', data); 
    })
    .catch((error) => {
      console.error('Error:', error); 
    });

  console.log('adfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  

    console.log('seo Data:', dataToSubmit.seoData);
    console.log('stories data' , dataToSubmit.stories)

    console.log('publish data', publishStatus)
    console.log('username', userName, idGenerate)
  };


  // fetch('https://www.medicoverhospitals.in/apis/get_story?storyid=1001', {
  //   method: 'GET',
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     return response.json(); 
  //   })
  //   .then((data) => {
  //     console.log('Story Dataasdfasdfasf:', data); 
  //   })
  //   .catch((error) => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });




  return (
    <div className="container my-4">
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

      <SeoElements formData={formData} setFormData={setFormData} />




      <PublishSection publishStatus={publishStatus} setPublishStatus={setPublishStatus} />
      <SubmissionSection handleSubmit={handleSubmit} />
    </div>
  );
};

export default Addtstory;
