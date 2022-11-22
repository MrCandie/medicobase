import Head from "next/head";
import Link from "next/link";
import { Fragment, useState } from "react";
import classes from "./nurses.module.css";
import NursesForm from "./NursesForm";

export default function Nurses() {
  const [wardForm, showWardForm] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Nurses</title>
      </Head>
      <section className={classes.nurses}>
        <h1>Nurses Portal</h1>
        <div>
          <Fragment>
            <div className={classes.action}>
              <Link
                href=""
                onClick={() => showWardForm((prevState) => !prevState)}
                className="btn"
              >
                Register Ward
              </Link>
              <Link className="btn" href="/ward">
                Go To Ward
              </Link>
            </div>
          </Fragment>
        </div>
        {wardForm && <NursesForm />}
      </section>
    </Fragment>
  );
}
