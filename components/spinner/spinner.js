import Head from "next/head";
import React, { Fragment } from "react";
import classes from "./spinner.module.css";

export default function Spinner() {
  return (
    <Fragment>
      <Head>
        <title></title>
        <script
          src="https://kit.fontawesome.com/ea3bde8322.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div className={classes.spinner}>
        <i class="fa-solid fa-spinner"></i>
      </div>
    </Fragment>
  );
}
