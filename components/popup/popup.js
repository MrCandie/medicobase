import { Fragment } from "react";
import Overlay from "../overlay/overlay";
import classes from "./popup.module.css";

export default function Popup(props) {
  return (
    <Fragment>
      <Overlay />
      <main className={classes.main}>{props.children}</main>;
    </Fragment>
  );
}
