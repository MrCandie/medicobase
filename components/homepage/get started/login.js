import Link from "next/link";
import { useRef, useState } from "react";
import classes from "./account.module.css";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../../spinner/spinner";
import Popup from "../../popup/popup";
import EyeIcon from "../../ui/EyeIcon";

export default function Logins() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState();
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setLoading(true);
    const result = await signIn("credentials", {
      email: enteredEmail,
      password: enteredPassword,
      redirect: false,
    });
    console.log(result);
    setLoading(false);
    if (result.error === null) {
      setMsg("Sign in successful");
      setSuccess(true);
    }
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
              router.replace("/admin");
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
    <section className={classes.signin}>
      <div className={classes.svg}></div>
      <div className={classes.svg1}></div>
      <div className={classes.container}>
        <h1>Login Here</h1>
        <form onSubmit={loginHandler}>
          <div className={classes.register}>
            <label htmlFor="name">Organization Email</label>
            <input ref={emailRef} required id="name" type="email" />
          </div>
          <div className={classes.register}>
            <label htmlFor="password">Enter Password</label>
            <input ref={passwordRef} required id="password" type={type} />
            <EyeIcon icon={icon} toggleHandler={toggleHandler} />
          </div>
          <button className={classes.btn}>Login</button>
          <p>
            Don't have an account? <Link href="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
      {loading && <Spinner />}
    </section>
  );
}
