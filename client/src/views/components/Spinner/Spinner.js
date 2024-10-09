import React from "react";

const Spinner = () => {
  return (
    //  <!-- Spinner Start -->
    <div
      id="spinner"
    >
      <div
        style={{ width: "6rem", height: "6rem" }}
        role="status"
      ></div>
      <img src="img/logo.png" alt="Logo" style={{width: '50px', height: '50px'}}/>
    </div>
    //  <!-- Spinner End -->
  );
};

export default Spinner;
