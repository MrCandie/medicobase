import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import classes from "./eyeicon.module.css";

export default function EyeIcon({ toggleHandler, icon }) {
  return (
    <span onClick={toggleHandler} className={classes.eye}>
      {icon ? <FiEye /> : <FiEyeOff />}
    </span>
  );
}
