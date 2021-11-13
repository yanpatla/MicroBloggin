import React from "react";

const Error404 = () => {
  return (
    <div className="containerError">
      <div class="noise"></div>
      <div class="overlay"></div>
      <div class="terminal">
        <h1>
          Error <span class="errorcode">404</span>
        </h1>
        <p class="output">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p class="output">
          Please try to <a className="errorLink" href="/">go back</a> or{" "}
          <a  className="errorLink" href="/home">return to the homepage</a>.
        </p>
        <p class="output">Good luck.</p>
      </div>
    </div>
  );
};

export default Error404;
