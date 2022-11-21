import Link from "next/link";
import { Fragment, useState } from "react";
import classes from "./nurses.module.css";
import NursesForm from "./NursesForm";

export default function Nurses() {
  const [wardForm, showWardForm] = useState(false);
  return (
    <section className={classes.nurses}>
      <h1>Nurses Portal</h1>
      <div>
        {!wardForm && (
          <Fragment>
            <div className={classes.action}>
              <button onClick={() => showWardForm(true)} className="btn">
                Register a new Ward
              </button>
              <Link className="btn" href="/ward">
                Go To Ward
              </Link>
            </div>
          </Fragment>
        )}
      </div>
      {wardForm && <NursesForm />}
    </section>
  );
}
