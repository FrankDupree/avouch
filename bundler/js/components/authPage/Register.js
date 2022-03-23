import React, { useState, useEffect, useCallback } from "react";
import { useQueryParams } from "hookrouter";
import _, { debounce } from "lodash";
import axios from 'axios';


const Register = () => {
  const [queryParams] = useQueryParams();
  const [data, setData] = useState({
    emailOrPhone: "",
    username: "",
    password: "",
    confirmPassword: "",
    isTaken: false,
  });

  const headerKey = document.getElementById("_csrf_header").getAttribute("content");
  const headerValue = document.getElementById("_csrf").getAttribute("content");

  const config = {
    headers:{
      [headerKey]: headerValue,
    }
  };

  const { emailOrPhone, username, password, confirmPassword, isTaken } = data;

  const handleChange = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const userNameChange = (e) => {
    setData((data) => ({
      ...data,
      username: e.target.value,
    }));
    search(e.target.value);
  };

  const search = useCallback(
    debounce(async (query, callback) => {
      if (query.length > 4) {
        await fetch(`/checkusername`, {
          method: "POST",
          headers: {
            [headerKey]:headerValue,
          },
          body: JSON.stringify({ username: query }),
        })
          .then((res) => res.text())
          .then((res) => {
            setData((data) => ({
              ...data,
              isTaken: res == "none",
            }));
          })
          .then(callback);
      }
    }, 300),
    []
  );

 const submitForm=(e)=>{
   e.preventDefault();
   axios.post('/register', {
     username:username,
     password:password,
     confirmPassword:confirmPassword,
     emailOrPhone:emailOrPhone
   }, config)
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });
 }

  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
      data-uk-height-viewport
    >
      <div className="uk-width-large uk-padding-small">
        <form className="uk-grid-small" data-uk-grid>
          <div className="uk-width-1-2@s">
            <input
              placeholder="email/phone number"
              name="emailOrPhone"
              className="uk-input"
              type="text"
              value={emailOrPhone}
              onChange={handleChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              placeholder="username"
              name="username"
              className="uk-input"
              type="text"
              value={username}
              onChange={userNameChange}
            />
            {isTaken && (
              <div className="uk-text-danger">username is already taken</div>
            )}
          </div>
          <div className="uk-width-1-2@s">
            <input
              placeholder="password"
              name="password"
              className="uk-input"
              type="text"
              value={password}
              onChange={handleChange}
            />
            <input
              name="_csrf"
              type="hidden"
              value={document.getElementById("_csrf").getAttribute("content")}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              placeholder="re-enter password"
              name="confirmPassword"
              className="uk-input"
              type="text"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="uk-margin-bottom">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-width-1-1"
              onClick={submitForm}
            >
              REGISTER
            </button>
          </div>
        </form>
        <div>
          <div className="uk-text-center">
            Already have an account?{" "}
            <a className="uk-link-reset uk-text-small" href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
