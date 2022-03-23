import React, { useState, useEffect } from "react";
import { useQueryParams } from "hookrouter";
import _, { debounce } from "lodash";

const Register = () => {
  const [queryParams] = useQueryParams();
  const [data, setData] = useState({
    emailOrPhone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { emailOrPhone, username, password, confirmPassword } = data;

  const handleChange = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const userNameChange = (e) => {
    debouncedSearch(e.target.value);
  };

  async function search(criteria) {
    const response = await fetch(`/checkusername`, {
      method: "POST",
      headers: {
        [document.getElementById("_csrf_header").getAttribute("content")]:
          document.getElementById("_csrf").getAttribute("content"),
      },
      body: JSON.stringify({ username: criteria }),
    });
    const body = await response.json();
    console.log("body.results", body.results);
    return body.results.map((result) => result.name);
  }

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setData((data) => ({
        ...data,
        username: criteria,
      }));
      await search(criteria);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const { error } = queryParams;
  console.log(error);

  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
      data-uk-height-viewport
    >
      <div className="uk-width-large uk-padding-small">
        {error != undefined && (
          <div id="err" className="uk-alert-danger" data-uk-alert>
            <a className="uk-alert-close" data-uk-close></a>
            <p>Invalid username or password.</p>
          </div>
        )}
        <form className="uk-grid-small" data-uk-grid>
          <div className="uk-width-1-2@s">
            <input
              placeholder="Email/Phone number"
              name="emailOrPhone"
              className="uk-input"
              type="text"
              value={emailOrPhone}
              onChange={handleChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              placeholder="Username"
              name="username"
              className="uk-input"
              type="text"
              value={username}
              onChange={userNameChange}
            />
          </div>
          <div className="uk-width-1-2@s">
            <input
              placeholder="Password"
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
