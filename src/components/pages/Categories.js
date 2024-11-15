import React from "react";
import catogary1 from "../../assets/images/category1.png";
import catogary2 from "../../assets/images/category2.png";
import catogary3 from "../../assets/images/category3.png";
import catogary4 from "../../assets/images/category4.png";
import catogary5 from "../../assets/images/category5.png";
import catogary6 from "../../assets/images/category6.png";
import { Link } from "react-router-dom";
import '../styles/categories.css'

const categories = [
  { id: 1, title: "Category 1", image: catogary1 },
  { id: 2, title: "Category 2", image: catogary2 },
  { id: 3, title: "Category 3", image: catogary3 },
  { id: 4, title: "Category 4", image: catogary4 },
  { id: 5, title: "Category 5", image: catogary5 },
  { id: 6, title: "Category 6", image: catogary6 },
  { id: 7, title: "Category 7", image: catogary3 },
  { id: 8, title: "Category 8", image: catogary2 },
];

const Categories = () => {
  return (
    <div className="categories-section">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 px-3 mt-5" >
        <h1 className="fw-semibold mb-0">Categories</h1>
        <ul className="d-flex align-items-center gap-2 m-0">
          <Link
            to="/add-category"
            type="button"
            className="btn btn-primary radius-8 px-20 py-11"
          >
            Add Category
          </Link>
        </ul>
      </div>
      <div className="row gy-4">
        {categories.map((category) => (
          <div key={category.id} className="col-xxl-3 col-sm-3">
            <div className="card h-100 radius-12">
              <img
                src={category.image}
                className="card-img-top "
                alt={category.title}
              />
              <div className="card-body p-16 text-center">
                <h5 className="card-title text-lg text-primary-light mb-6">
                  {category.title}
                </h5>
                <button className="btn px-4 mt-5 view-btn">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
