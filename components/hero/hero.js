import Link from "next/link";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.section}>
      <h1>Ready?</h1>
      <Link className="btn" href="/sign-up">
        Get started
      </Link>
    </section>
  );
}
