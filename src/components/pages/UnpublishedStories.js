import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Filter, Plus, Eye, Pencil, Trash } from "react-bootstrap-icons";
import categoryimg1 from "../../assets/images/story1.png";
import { useNavigate, Link } from "react-router-dom";
import '../styles/PublishedStory.css';

const UnpublishedStory = ({ stories }) => {
 


  const navigate = useNavigate();
  const [storyData, setStoryData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(storyData.length / rowsPerPage);

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

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginatedData = storyData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
              <Plus className="me-2" /> 
              <Link to='/add-story' className="custom-btn1">Add New Story</Link>
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

          <div className="table-responsive cutsom-table mt-2 mx-4">
          <Table className="mx-auto table m-0">
              <thead>
                <tr>
                  <th className="pubtb">Image</th>
                  <th className="pubtb">Story Name</th>
                  <th className="pubtb">Status</th>
                  <th className="pubtb">
                    Active / Inactive
                  </th>
                  <th className="pubtb">Action</th>
                </tr>
              </thead>
              <tbody>
              {paginatedData?.length > 0 ? (
    paginatedData.map((story, id) => (
                  <tr key={id}>
                    <td className="pubtb img">
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
                    <td className="pubtb">{story.title || "N/A"}</td>
                    <td className="pubtb">{story.status || "Un-Published"}</td>
                    <td className="pubtb">
                      <Form.Check
                        type="switch"
                        id={`custom-switch-${id}`}
                        defaultChecked={story.isActive || false}
                        className="custom-switch"
                      />
                    </td>
                    <td className="justify-content-around pubtb">
                    <div className="d-flex">
                      <Button variant="outline-primary" size="sm" className="rounded-0 view">
                        <Eye />
                      </Button>
                      <Link to={`/edit-story/${story.id}`} state={story}>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                           className="mx-2 edit rounded-0"
                          // onClick={() => handleEdit(story)}
                        >
                          <Pencil />
                        </Button>
                      </Link>
                      <Button variant="outline-danger" size="sm"  className="rounded-0 delete" >
                        <Trash />
                      </Button>
                      </div>
                    </td>
                  </tr>
               ))
              ) : (
                <tr>
      <td colSpan="5" className="text-center">
        No stories available for this page.
      </td>
    </tr>
  )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between paginations align-items-center py-3 px-4">
                        <span>
                          Showing {(currentPage - 1) * rowsPerPage + 1}-
                          {Math.min(currentPage * rowsPerPage, storyData.length)} of{" "}
                          {storyData.length}
                        </span>
                        <div className="pagination-buttons d-flex" style={{ gap: "5px" }}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                         >
                          {"<"}
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          >
                          {">"}
                        </Button>
                        </div>
                    </div>
        </Card>
      </div>
    </>
  );
};

export default UnpublishedStory;
