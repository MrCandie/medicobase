import Link from "next/link";
import classes from "./header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Medicobaze</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="">Home</Link>
          </li>

          <li>
            <Link href="/sign-up">Get Started</Link>
          </li>
        </ul>
      </nav>
      <div className={classes.floating}>
        <ul>
          <li>
            <Link href="">Home</Link>
          </li>

          <li>
            <Link href="/sign-up">Get Started</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
