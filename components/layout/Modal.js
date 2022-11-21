// import ReactDOM from "react-dom";
// import createPortal from "react-dom";
// import { Fragment } from "react";
// import classes from "./Modal.module.css";

// const Backdrop = (props) => {
//   return <div onClick={props.hideCart} className="backdrop" />;
// };
// const ModalOverlay = (props) => {
//   return (
//     <div className={classes.modal}>
//       <div className={classes.content}>{props.children}</div>
//     </div>
//   );
// };

// const portalElement = document.getElementById("overlays");

// const Modal = (props) => {
//   return (
//     <Fragment>
//       {React.createPortal(
//         <Backdrop hideCart={props.hideCart} />,
//         portalElement
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay>{props.children}</ModalOverlay>,
//         portalElement
//       )}
//     </Fragment>
//   );
// };

// export default Modal;
