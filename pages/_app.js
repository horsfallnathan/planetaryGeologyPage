import React from "react";
import App from "next/app";
import { PayloadProvider } from "../comps/payloadContext";
import webContentEn from "../webContentEn.json";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <PayloadProvider value={webContentEn}>
        <Component {...pageProps} />
      </PayloadProvider>
    );
  }
}
