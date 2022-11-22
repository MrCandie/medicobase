import { useRef, useState } from "react";
import classes from "./vital.module.css";
import Spinner from "../../spinner/spinner";
import Overlay from "../../overlay/overlay";

export default function VitalsForm({ setVitals }) {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const tempRef = useRef();
  const pulseRef = useRef();
  const respRef = useRef();
  const bpRef = useRef();
  const commentRef = useRef();
  const nurseNameRef = useRef();

  const vitalsHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredTemp = tempRef.current.value;
    const enteredResp = respRef.current.value;
    const enteredPulse = pulseRef.current.value;
    const enteredBp = bpRef.current.value;
    const enteredComment = commentRef.current.value;
    const enteredNurseName = nurseNameRef.current.value;

    const vitalsData = {
      timeUploaded: new Date().toISOString(),
      name: enteredName,
      temperature: enteredTemp,
      pulse: enteredPulse,
      respiration: enteredResp,
      bloodPressure: enteredBp,
      comment: enteredComment,
      nurseName: enteredNurseName,
    };

    if (
      !enteredName ||
      !enteredTemp ||
      !enteredBp ||
      !enteredComment ||
      !enteredNurseName ||
      !enteredResp ||
      !enteredPulse
    ) {
      return;
    }
    setIsLoading(true);
    fetch("/api/vitals", {
      method: "POST",
      body: JSON.stringify(vitalsData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setIsLoading(false);
      });
  };
  return (
    <section className={classes.forms}>
      <Overlay />
      <div className={classes.form}>
        <h1>Record a new vital sign</h1>
        <form onSubmit={vitalsHandler}>
          <div className={classes.patient}>
            <label htmlFor="name">Patient Name</label>
            <input ref={nameRef} type="text" id="name" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="temp">Temperature</label>
            <input ref={tempRef} placeholder="35deg" type="text" id="temp" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="temp">Pulse</label>
            <input ref={pulseRef} placeholder="80b/m" type="text" id="temp" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="resp">Respiration</label>
            <input ref={respRef} placeholder="16c/m" type="text" id="resp" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="pressure">Blood Pressure</label>
            <input
              ref={bpRef}
              placeholder="120/80mmHg"
              type="text"
              id="pressure"
            />
          </div>
          <div className={classes.patient}>
            <label htmlFor="nurse">Nurse Name</label>
            <input ref={nurseNameRef} type="text" id="nurse" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="comments">Add comments & findings</label>
            <textarea ref={commentRef} rows="4" id="comments" />
          </div>
          <div className="action">
            <button className={classes.btn}>Submit</button>
            <button
              onClick={() => setVitals(false)}
              type="button"
              className={classes.btn}
            >
              Cancel
            </button>
          </div>
        </form>
        {isLoading && <Spinner />}
      </div>
    </section>
  );
}
