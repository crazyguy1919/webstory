import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Filter, Plus, Eye, Pencil, Trash } from "react-bootstrap-icons";
import categoryimg1 from "../../assets/images/story1.png";
import { Link } from "react-router-dom";
import '../styles/unpublished.css'

const UnpublishedStory = ({ setforedIt}) => {
  const [storyData, setStoryData] = useState([]);
  const [error, setError] = useState(null);
  const [realsdata,setRealsdata] = useState('')

  // Fetch stories inside useEffect
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "https://www.medicoverhospitals.in/apis/getallstories",
          { method: "GET" }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched Story Data:", data);
        setStoryData(data.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError(err.message);
      }
    };

    fetchStories();
  }, []); // Fetch runs only once on component mount

  // Handle status switch toggle
  const statusClick = async (id, storystatus, e) => {
    alert('Story is Published')
    const newStatus = e.target.checked ? "active" : "in-active";
    console.log("Story ID:", id);
    console.log("Previous Status:", storystatus);
    console.log("New Status:", newStatus);

    try {
      const response = await fetch(
        "https://www.medicoverhospitals.in/apis/webstory_update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyid: id,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response received:", data);

      // Update local state to reflect status change
      setStoryData((prevData) =>
        prevData.map((story) =>
          story.storyid === id ? { ...story, status: newStatus } : story
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const editClick = async (id) => {

    setforedIt(id);
    try {
      const response = await fetch(
        `https://www.medicoverhospitals.in/apis/get_story?storyid=${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log("Fetched story details:", data);
      setRealsdata(data.data)
      return data;
    } catch (error) {
      console.error("Error fetching story details:", error);
      throw error;
    }

  };

console.log('qqqqqqqqqqqqqqqq',realsdata)


  const reelsData = [
    {
    
      image: `https://www.medicoverhospitals.in/apis/uploads/${realsdata.img1 ==='' ? 'p1.png' : realsdata.img1}` ,
      title: realsdata.img1t,
      description: realsdata.img1d,
    },
    {
    
      image: `https://www.medicoverhospitals.in/apis/uploads/${realsdata.img2 ==='' ? 'p2.png' : realsdata.img2}`,
      title: realsdata.img2t,
      description: realsdata.img2d,
    },
    {
     
      image: `https://www.medicoverhospitals.in/apis/uploads/${realsdata.img3 ==='' ? 'p4.png' : realsdata.img3}`,
      title: realsdata.img3t,
      description: realsdata.img3d,
    },
    {
   
      image: `https://www.medicoverhospitals.in/apis/uploads/${realsdata.img4 ==='' ? 'p2.png' : realsdata.img4}`,
      title: realsdata.img4t,
      description: realsdata.img4d,
    },
    {
    
      image: `https://www.medicoverhospitals.in/apis/uploads/${realsdata.img5 ==='' ? 'p2.png' : realsdata.img5}`,
      title: realsdata.img5t,
      description: realsdata.img5d,
    },
  ];    



  const closeClick = () =>{
    setRealsdata('')
  }
  return (
    <>
      <div className="d-flex justify-content-center" style={{ padding: "2rem" }}>
        <Card
          className="custom-card-style"
          style={{ width: "100%", maxWidth: "85rem" }}
        >
          <div className="custom-btn-container d-flex justify-content-end align-items-center p-3 w-100">
            <Button
              variant="outline-primary"
              size="sm"
              className="me-3 custom-btn"
            >
              <Filter className="me-2" /> Filter
            </Button>

            <Link
              to="/add-story"
              type="button"
              className="btn btn-primary radius-8 px-3 py-1"
            >
              <Plus className="me-2" />
              Add New Story
            </Link>

            <div
              className="d-flex justify-content-center"
              style={{ flexGrow: 1 }}
            >
              <Form.Control
                type="text"
                placeholder="Search"
                style={{ width: "130px" }}
                className="me-3"
              />
            </div>
          </div>
          <hr />

          <div className="table-responsive">
            <Table bordered className="mx-auto">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#f8f9fa" }}>Image</th>
                  <th style={{ backgroundColor: "#f8f9fa" }}>Story Name</th>
                  <th style={{ backgroundColor: "#f8f9fa" }}>Status</th>
                  <th style={{ backgroundColor: "#f8f9fa" }}>
                    Active / Inactive
                  </th>
                  <th style={{ backgroundColor: "#f8f9fa" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {storyData.map((storydata, id) => (
                  storydata.status=='in-active' ?
                  <tr key={id}>
                    <td>
                      <img
                        src={categoryimg1} // Replace with story.image if the API provides image URLs
                        alt="Story"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{storydata.title || "N/A"}</td>
                    <td>{storydata.status || "Un-Published"}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={storydata.status === "active"} 
                        onChange={(e) =>
                          statusClick(storydata.storyid, storydata.status, e)
                        }
                        className="text-center"
                      />
                    </td>
                    <td className="d-flex justify-content-around">
                      <Button variant="outline-primary" size="sm">
                        <Eye   onClick={() => editClick(storydata.storyid)}  />
                      </Button>
                      <Link
                        to="/edit-story"
                        className="mx-2"
                        onClick={() => editClick(storydata.storyid)}
                      >
                        <Pencil />
                      </Link>
                      <Button variant="outline-danger" size="sm">
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                  : ''
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between paginations align-items-center py-3 px-4">
            <span>Showing 1-5 of 20 </span>
            <div
              className="pagination-buttons d-flex"
              style={{ gap: "5px" }}
            >
              <Button variant="outline-primary" size="sm">
                {"<"}
              </Button>
              <Button variant="outline-primary" size="sm">
                {">"}
              </Button>
            </div>
          </div>
        </Card>
      </div>






{/* reals ui section */}
{realsdata!=="" && 
<div className="reels-section">
<h3 className="close-button" onClick={closeClick}>x</h3>
  
    <div id="reelsCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {reelsData.map((reel, index) => (
          <div
            key={reel.id}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={reel.image}
              className="d-block w-20 m-auto"
              alt={reel.title}
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 style={{color:'white',background:'blue',borderRadius:'5px'}}>{reel.title}</h5>
              <p style={{color:'white',background:'blue',borderRadius:'5px'}}>{reel.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#reelsCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#reelsCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>


  </div>}
    </>
  );
};

export default UnpublishedStory;
