import React from "react";
import { Link } from "react-router-dom";
import './categorylist.css';
import { MdNaturePeople } from "react-icons/md";
import { MdOutlineScience } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { GrTechnology } from "react-icons/gr";

const CategoryList = () => {
  return (
    <div className="category-container">
      <h2 className="headline">Categories</h2>
      <div className="inner-div">
        <Link to={`/categories/Fiction`} className="category-box bg-yellow">
          <MdNaturePeople size={40} />
          <Link to={`/categories/Fiction`} className="link-text">
            Fiction
          </Link>
        </Link>
        <Link to={`/categories/Science`} className="category-box bg-blue">
          <MdOutlineScience size={40} />
          <Link to={`/categories/Science`} className="link-text">
            Science
          </Link>
        </Link>
        <Link to={`/categories/History`} className="category-box bg-purple">
          <BsClockHistory size={40} />
          <Link to={`/categories/History`} className="link-text">
            History
          </Link>
        </Link>
        <Link to={`/categories/Technology`} className="category-box bg-green">
          <GrTechnology size={40} />
          <Link to={`/categories/Technology`} className="link-text">
            Technology
          </Link>
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
