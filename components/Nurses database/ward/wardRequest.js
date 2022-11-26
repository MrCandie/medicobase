import classes from "./ward.module.css";
import Overlay from "../../overlay/overlay";
import Link from "next/link";

export default function WardRequest({ setReq, setrequest }) {
  return (
    <div className="container">
      <Overlay />
      <div className={classes.request}>
        <Link onClick={() => setReq(true)} href="">
          Doctor
        </Link>
        <hr />
        <Link href="">Pharmacy</Link>
        <hr />
        <Link href="">Laboratory</Link>
        <hr />
        <Link href="">Radiology</Link>
        <button onClick={() => setrequest(false)} className="btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
