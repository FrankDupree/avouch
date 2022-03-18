import React from "react";

const Login = () => {
  return (
    <div
      className="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport"
      data-uk-height-viewport
    >
      <div className="uk-width-medium uk-padding-small">
        <form>
          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <span className="uk-form-icon" data-uk-icon="icon: user"></span>
              <label className="uk-form-label">Email or Phone number</label>
              <input className="uk-input" type="text" />
            </div>
          </div>

          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <span
                className="uk-form-icon uk-form-icon-flip"
                data-uk-icon="icon: lock"
              ></span>
              <label className="uk-form-label">Password</label>
              <input className="uk-input" type="text" />
            </div>
          </div>
          <div className="uk-margin-small">
            <label>
              <input className="uk-checkbox" type="checkbox" /> Keep me logged
              in
            </label>
          </div>
          <div className="uk-margin-bottom">
            <button type="submit" className="uk-button uk-button-primary">
              LOG IN
            </button>
          </div>
        </form>
        <div>
          <div className="uk-text-center">
            <a
              className="uk-link-reset uk-text-small"
            >
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
