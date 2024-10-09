/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";

import "./PageNotFound.css";

const PageNotFound = (props) => {
  return (
    <div className="container-xxl">
            <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
            <h1 className="display-1">404</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">
              We’re sorry, the page you have looked for does not exist in our
              website! Maybe go to our home page or try to use a search?
            </p>
            <a
              className="btn btn-primary rounded-pill py-3 px-5"
              href=""
              onClick={() => props.history.goBack()}
            >
              Go Back To Home
            </a>
          </div>
  );
};

PageNotFound.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default PageNotFound;
