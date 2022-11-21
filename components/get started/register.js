import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import classes from "./account.module.css";
import { signIn } from "next-auth/react";
import Spinner from "../spinner/spinner";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const signupHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      return;
    }

    setLoading(true);
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setLoading(false);
      });
  };

  return (
    <section className={classes.signup}>
      <div className={classes.blur}></div>
      <div className={classes.container}>
        <h1>Get Started</h1>
        <form onSubmit={signupHandler}>
          <Fragment>
            <div className={classes.register}>
              <label htmlFor="name">Organization Email</label>
              <input ref={emailRef} required id="name" type="email" />
            </div>
            <div className={classes.register}>
              <label htmlFor="password">Enter Password</label>
              <input ref={passwordRef} required id="password" type="password" />
            </div>
            <button className={classes.btn}>Register</button>
            <p>
              Already have an account?{" "}
              <Link
                onClick={() => {
                  signIn();
                }}
                href=""
              >
                Login
              </Link>
            </p>
          </Fragment>
        </form>
      </div>
      {loading && <Spinner />}
    </section>
  );
}
