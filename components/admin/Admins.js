import Link from "next/link";
import { Fragment } from "react";
import classes from "./admin.module.css";

export default function Admin() {
  return (
    <Fragment>
      <section className={classes.admin}>
        <div className={classes.department}>
          <h1>Welcome to your database</h1>
          <Link href="/doctor">Doctors & Consultant Database</Link>
          <Link href="/nurses">Nurses Database</Link>
        </div>
      </section>
    </Fragment>
  );
}
