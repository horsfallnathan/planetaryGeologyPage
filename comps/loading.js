import React from "react";
import Layout from "./layout";

export default function Loading() {
  return (
    <Layout>
      <div
        data-inline-loading
        className="bx--inline-loading"
        role="alert"
        aria-live="assertive"
      >
        <div className="bx--inline-loading__animation">
          <div
            data-inline-loading-spinner
            className="bx--loading bx--loading--small"
          >
            <svg className="bx--loading__svg" viewBox="-75 -75 150 150">
              <circle
                className="bx--loading__background"
                cx="0"
                cy="0"
                r="26.8125"
              />
              <circle
                className="bx--loading__stroke"
                cx="0"
                cy="0"
                r="26.8125"
              />
            </svg>
          </div>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            style={{ willChange: "transform" }}
            xmlns="http://www.w3.org/2000/svg"
            className="bx--inline-loading__checkmark-container"
            hidden=""
            data-inline-loading-finished=""
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8,1C4.1,1,1,4.1,1,8c0,3.9,3.1,7,7,7s7-3.1,7-7C15,4.1,11.9,1,8,1z M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"></path>
            <path
              d="M7,11L4.3,8.3l0.9-0.8L7,9.3l4-3.9l0.9,0.8L7,11z"
              data-icon-path="inner-path"
              opacity="0"
            ></path>
          </svg>
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            style={{ willChange: "transform" }}
            xmlns="http://www.w3.org/2000/svg"
            className="bx--inline-loading--error"
            hidden=""
            data-inline-loading-error=""
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"></path>
          </svg>
        </div>
        <p data-inline-loading-text-active className="bx--inline-loading__text">
          Loading data...
        </p>
        <p
          data-inline-loading-text-finished
          hidden
          className="bx--inline-loading__text"
        >
          Data loaded.
        </p>
        <p
          data-inline-loading-text-error
          hidden
          className="bx--inline-loading__text"
        >
          Loading data failed.
        </p>
      </div>
    </Layout>
  );
}
