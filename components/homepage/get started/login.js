import Link from "next/link";
import { useRef, useState } from "react";
import classes from "./account.module.css";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Spinner from "../../spinner/spinner";

export default function Logins() {
  const [loading, setLoading] = useState(false);
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
      alert("Sign in successful");
      router.replace("/admin");
    }
  };

  return (
    <section className={classes.signin}>
      <div className={classes.blur}></div>
      <div className={classes.container}>
        <h1>Login Here</h1>
        <form onSubmit={loginHandler}>
          <div className={classes.register}>
            <label htmlFor="name">Organization Email</label>
            <input ref={emailRef} required id="name" type="email" />
          </div>
          <div className={classes.register}>
            <label htmlFor="password">Enter Password</label>
            <input ref={passwordRef} required id="password" type="password" />
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
