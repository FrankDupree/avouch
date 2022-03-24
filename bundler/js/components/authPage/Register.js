import React, { useState, useEffect, useCallback } from "react";
import _, { debounce } from "lodash";
import axios from "axios";

const Register = () => {
  const {username:un, emailOrPhone:ep} = window.message;
  const [data, setData] = useState({
    emailOrPhone: ep ? ep :"",
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

  const config = {
    headers: {
      [headerKey]: headerValue,
    },
  };

  const {
    emailOrPhone,
    username,
    password,
    confirmPassword,
    isTaken,
    errors,
    globalE,
  } = data;

  useEffect(() => {
    var errors = document.getElementsByClassName("fielderr");
    var globalErrors = document.getElementsByClassName("globalerr");
    var con = [];
    for (var i = 0; i < errors.length; i++) {
      var er = errors[i].innerText;
      var payload = er.split("|");
      var propertyName = payload[0].trim();
      var propertyError = payload[1].trim();
      var allErrors = propertyError.split(",");
      var errors2 = [];
      for (var x = 0; x < allErrors.length; x++) {
        errors2.push(allErrors[x]);
      }
      var findIndex = con.findIndex((x) => x.name == propertyName);
      if (findIndex < 0) {
        var newData = { name: propertyName, errors: errors2 };
        con.push(newData);
      } else {
        var oldError = con[findIndex];
        oldError.errors = [...oldError.errors, ...errors2];
        con[findIndex] = oldError;
      }
    }

    var con1 = [];
    for (var b = 0; b < globalErrors.length; b++) {
      var er1 = globalErrors[b].innerText;
      var payload1 = er1.split("|");
      var propertyError1 = payload1[1].trim();
      con1.push(propertyError1);
    }

    setData((data) => ({
      ...data,
      errors: con,
      globalE: con1,
    }));
  }, []);

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

  const parseName = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
      return str.toUpperCase();
    });
  };

  const search = useCallback(
    debounce(async (query, callback) => {
      if (query.length > 4) {
        await fetch(`/checkusername?username=` + query, {
          method: "POST",
          headers: {
            [headerKey]: headerValue,
          },
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

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        "/register",
        {
          username: username,
          password: password,
          confirmPassword: confirmPassword,
          emailOrPhone: emailOrPhone,
        },
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
      data-uk-height-viewport
    >
      <div className="uk-width-large uk-padding-small">
        {globalE.length > 0 && (
          <div className="uk-alert-danger" data-uk-alert>
            <a className="uk-alert-close" data-uk-close></a>
            {globalE.map((x, i) => {
              return <p key={i}>{x}</p>;
            })}
          </div>
        )}
        {errors.length > 0 && (
          <div className="uk-alert-danger" data-uk-alert>
            <a className="uk-alert-close" data-uk-close></a>
            <dl className="uk-description-list">
              {errors.map((x, i) => {
                return (
                  <React.Fragment key={i}>
                    <dt>{parseName(x.name)}</dt>
                    {x.errors.map((j, k) => {
                      return <dd key={k}>{j}</dd>;
                    })}
                  </React.Fragment>
                );
              })}
            </dl>
          </div>
        )}
        <form className="uk-grid-small" method="post" data-uk-grid>
          <div className="uk-width-1-2@s">
            <input
              name="_csrf"
              type="hidden"
              value={document.getElementById("_csrf").getAttribute("content")}
            />
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
