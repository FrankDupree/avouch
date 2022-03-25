import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Email = () => {
  const { username: un, emailOrPhone: ep } = window.message;
  const [data, setData] = useState({
    emailOrPhone: ep ? ep : "",
    username: un ? un : "",
    password: "",
    confirmPassword: "",
    isTaken: false,
    errors: [],
    globalE: [],
  });

  const headerKey = document
    .getElementById("_csrf_header")
    .getAttribute("content");
  const headerValue = document.getElementById("_csrf").getAttribute("content");

  return (
    <div
      className="uk-grid-collapse uk-child-width-expand@s uk-text-center"
      data-uk-grid
    >
      <div>
        <div className="uk-background-primary uk-padding uk-light">Item</div>
      </div>
      <div>
        <div className="uk-background-secondary uk-padding uk-light">Item</div>
      </div>
    </div>
  );
};
export default Email;
