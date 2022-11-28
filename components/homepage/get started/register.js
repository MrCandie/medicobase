import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import classes from "./account.module.css";
import { signIn } from "next-auth/react";
import Spinner from "../../spinner/spinner";
import Popup from "../../popup/popup";
import { useRouter } from "next/router";
import EyeIcon from "../../ui/EyeIcon";

export default function Register() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState();
  const router = useRouter();

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
        setMsg(data.message);
        setSuccess(true);
        setLoading(false);
      });
  };

  if (success) {
    return (
      <Popup>
        <p className="center">{msg}</p>
        <div className="action">
          <button
            className="btn"
            onClick={() => {
              setSuccess(false);
              router.replace("/login");
            }}
          >
            Continue
          </button>
        </div>
      </Popup>
    );
  }

  function toggleHandler() {
    if (type === "password") {
      setType("text");
      setIcon(false);
    } else {
      setType("password");
      setIcon(true);
    }
  }

  return (
    <section className={classes.signup}>
      <div className={classes.svg}></div>
      <div className={classes.svg1}></div>
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
              <input ref={passwordRef} required id="password" type={type} />
              <EyeIcon icon={icon} toggleHandler={toggleHandler} />
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
