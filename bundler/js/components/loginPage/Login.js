import React from "react";
import { useQueryParams } from "hookrouter";

const Login = () => {
  const [queryParams] = useQueryParams();

  const { error } = queryParams;
  console.log(error);

  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
      data-uk-height-viewport
    >
      <div className="uk-width-medium uk-padding-small">
      {error != undefined && (
        <div id="err" className="uk-alert-danger" data-uk-alert>
          <a className="uk-alert-close" data-uk-close></a>
          <p>Invalid username or password.</p>
        </div>
      )}
        <form action="/login" method="post">
          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <span className="uk-form-icon" data-uk-icon="icon: user"></span>
              <input
                placeholder="Email/Phone number"
                name="username"
                className="uk-input"
                type="text"
              />
            </div>
          </div>

          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <span
                className="uk-form-icon uk-form-icon-flip"
                data-uk-icon="icon: lock"
              ></span>
              <input
                placeholder="Password"
                name="password"
                className="uk-input"
                type="text"
              />
              <input
                name="_csrf"
                type="hidden"
                value={document.getElementById("_csrf").getAttribute("content")}
              />
            </div>
          </div>
          <div className="uk-margin-small">
            <label>
              <input className="uk-checkbox" type="checkbox" /> Keep me logged
              in
            </label>
          </div>
          <div className="uk-margin-bottom">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-width-1-1"
            >
              LOG IN
            </button>
          </div>
        </form>
        <div>
          <div className="uk-text-center">
            <a className="uk-link-reset uk-text-small">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
