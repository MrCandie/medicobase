import Image from "next/image";
import classes from "./features.module.css";
import secure from "/public/images/secure.jpg";
import teamwork from "/public/images/teamwork.avif";
import Link from "next/link";
import { Fragment } from "react";
import Head from "next/head";

export default function Features() {
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <section id="features" className={classes.features}>
        <div className={classes.container}>
          <div className={classes.image}>
            <Image src={secure} alt="secure" width={200} height={250} />
          </div>
          <div className={classes.content}>
            <h1>Create a secure database for your organization in 5 seconds</h1>
            <p>
              This system helps organizations like hospitals with large data to
              safely upload and manage their data in a safe and secure database
              with ease of accessibility by authorized personnels.
            </p>
            <div className={classes.link}>
              <Link href="/sign-up">Explore</Link>
              <span class="material-symbols-outlined">arrow_right_alt</span>
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.content1}>
            <h1>Team Management Made Easy</h1>
            <p>
              Get access to departmental data from the comfort of your office on
              your computer. Manage your team more effectively and communicate
              updates easily.
            </p>
            <div className={classes.link}>
              <Link href="">Learn More</Link>
              <span class="material-symbols-outlined">arrow_right_alt</span>
            </div>
          </div>
          <div className={classes.image}>
            <Image src={teamwork} alt="secure" width={200} height={250} />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
