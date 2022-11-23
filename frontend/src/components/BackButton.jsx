import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function BackButton({ url }) {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowLeft />
      Back
    </Link>
  );
}

export default BackButton;
