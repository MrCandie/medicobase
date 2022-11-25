import { useRef, useState } from "react";
import Overlay from "../../overlay/overlay";
import Spinner from "../../spinner/spinner";
import classes from "./doctorrequest.module.css";
import Popup from "../../popup/popup";

export default function DoctorRequest({ setReq }) {
  const nameRef = useRef();
  const requestRef = useRef();
  const senderRef = useRef();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState();

  const requestHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredRequest = requestRef.current.value;
    const enteredSender = senderRef.current.value;

    if (!enteredName || !enteredRequest || !enteredSender) {
      return;
    }

    const requestData = {
      name: enteredName,
      request: enteredRequest,
      sender: enteredSender,
      time: new Date(),
    };

    setLoading(true);
    fetch("/api/request", {
      method: "POST",
      body: JSON.stringify(requestData),
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
          <button className="btn" onClick={() => setSuccess(false)}>
            Okay!
          </button>
        </div>
      </Popup>
    );
  }

  return (
    <section className={classes.section}>
      <Overlay />
      <div className={classes.req}>
        <h1>Enter your request</h1>
        <form onSubmit={requestHandler}>
          <div className={classes.request}>
            <label>Enter Department/ward name</label>
            <input ref={nameRef} type="text" />
          </div>
          <div className={classes.request}>
            <label>Enter Request</label>
            <textarea ref={requestRef} rows="3" id="request" />
          </div>
          <div className={classes.request}>
            <label htmlFor="name">Sender Name</label>
            <input ref={senderRef} type="text" id="name" />
          </div>
          <div className={classes.action}>
            <button className="btn">Send</button>
            <button onClick={() => setReq(false)} type="button" className="btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
      {loading && <Spinner />}
    </section>
  );
}
