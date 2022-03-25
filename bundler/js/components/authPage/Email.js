import React, { useState, useEffect } from "react";
import axios from "axios";

const Email = () => {
  const { username: un, emailOrPhone: ep } = window.message;
  const [data, setData] = useState({
    emailOrPhone: ep ? ep : "",
    username: un ? un : "",
    isEmail: false,
  });

  const { emailOrPhone, isEmail } = data;

  useEffect(() => {
    var usedEmail = isEmail;
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailOrPhone)) {
      usedEmail = true;
    }

    setData((data) => ({
      ...data,
      isEmail: usedEmail,
    }));
  }, []);

  const headerKey = document
    .getElementById("_csrf_header")
    .getAttribute("content");
  const headerValue = document.getElementById("_csrf").getAttribute("content");

  return (
    <div
      className="uk-grid-collapse uk-child-width-expand@s uk-margin-large-top"
      data-uk-grid
    >
      <div>
        <div
          className="uk-padding uk-light uk-height-large uk-background-cover"
          data-src={`/images/${isEmail ? "email.jpg" : "phone.jpg"}`}
          data-uk-img="loading: eager"
        ></div>
      </div>
      <div>
        <div className="uk-padding uk-height-large uk-margin-medium-top">
          <h1>Verification link sent!</h1>
          <div className="uk-text-lead uk-text-secondary rmt">
            We {isEmail ? "emailed" : "sent"} a confirmation link to
            <span className="uk-text-bold">{emailOrPhone}</span>
            <br />
            Check your {isEmail ? "email" : "phone"} for a link to confirm your
            account
          </div>
          <div className="uk-text-lead uk-text-secondary uk-text-small uk-margin-large-top">
            Didn't get a confirmation {isEmail ? "email" : "link"}?
            {isEmail && (
              <>
                <br /> Check your spam folder or
              </>
            )}
            <a href="" className="uk-text-bold">
              <span id="vcs" className="uk-icon" data-uk-icon="refresh"></span>
              Send again
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Email;
