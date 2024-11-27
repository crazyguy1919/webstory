import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Filter, Plus, Eye, Pencil, Trash } from "react-bootstrap-icons";
import categoryimg1 from "../../assets/images/story1.png";
import { useNavigate, Link } from "react-router-dom";

const UnpublishedStory = ({ stories }) => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState([]);
  const [error, setError] = useState(null);

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
        setStoryData(data.data);
      } catch (err) {
        console.error("Error fetching stories:", err);
        setError(err.message);
      }
    };

    fetchStories();
  }, []);

  const handleEdit = (story) => {
    navigate(`/edit-story/${story.id}`, { state: { story } });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ padding: "2rem" }}
      >
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
            <Button variant="primary" size="sm" className="me-3 custom-btn">
              <Plus className="me-2" /> Add New Story
            </Button>
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
                {storyData?.map((story, id) => (
                  <tr key={id}>
                    <td>
                      <img
                        src={story.image || categoryimg1} // Replace with story.image if the API provides image URLs
                        alt="Story"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{story.title || "N/A"}</td>
                    <td>{story.status || "Un-Published"}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        id={`custom-switch-${id}`}
                        defaultChecked={story.isActive || false}
                        className="text-center"
                      />
                    </td>
                    <td className="d-flex justify-content-around">
                      <Button variant="outline-primary" size="sm">
                        <Eye />
                      </Button>
                      <Link to={`/edit-story/${story.id}`} state={story}>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="mx-2"
                          // onClick={() => handleEdit(story)}
                        >
                          <Pencil />
                        </Button>
                      </Link>
                      <Button variant="outline-danger" size="sm">
                        <Trash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default UnpublishedStory;
