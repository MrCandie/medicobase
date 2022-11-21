import Head from "next/head";
import { Fragment } from "react";
import classes from "./footer.module.css";

export default function Footer() {
  return (
    <Fragment>
      <Head>
        <script
          src="https://kit.fontawesome.com/ea3bde8322.js"
          crossorigin="anonymous"
        ></script>
      </Head>
      <footer className={classes.footer}>
        <p>
          <i class="fa-regular fa-copyright"></i> File Trackka 2022
        </p>
      </footer>
    </Fragment>
  );
}
