import { useRef, useState } from "react";
import classes from "./patientreview.module.css";
import Spinner from "../../spinner/spinner";
import Overlay from "../../overlay/overlay";
import Popup from "../../popup/popup";

export default function PatientReview({ setReview }) {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const diagnosisRef = useRef();
  const findingsRef = useRef();
  const doctorRef = useRef();
  const changesRef = useRef();
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState();

  const reviewHandler = (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredDiagnosis = diagnosisRef.current.value;
    const enteredFindings = findingsRef.current.value;
    const enteredChanges = changesRef.current.value;
    const enteredDoctor = doctorRef.current.value;

    if (
      !enteredChanges ||
      !enteredDiagnosis ||
      !enteredDoctor ||
      !enteredFindings ||
      !enteredName
    ) {
      return;
    }

    const reviewData = {
      time: new Date(),
      name: enteredName,
      diagnosis: enteredDiagnosis,
      findings: enteredFindings,
      changes: enteredChanges,
      doctor: enteredDoctor,
    };

    setIsLoading(true);
    fetch("/api/review", {
      method: "POST",
      body: JSON.stringify(reviewData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        setSuccess(true);
        setIsLoading(false);
      });
  };

  if (success) {
    return (
      <Popup>
        <p className="success">{msg}</p>
        <div className="action">
          <button className="btn" onClick={() => setSuccess(false)}>
            Okay
          </button>
        </div>
      </Popup>
    );
  }

  return (
    <section className={classes.section}>
      <Overlay />
      <div className={classes.review}>
        <h1>Review Patient</h1>
        <hr />
        <form onSubmit={reviewHandler}>
          <div className={classes.patient}>
            <label htmlFor="name">Patient Name</label>
            <input ref={nameRef} type="text" id="name" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="name">Diagnosis</label>
            <input ref={diagnosisRef} type="text" id="name" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="name">Enter New Findings</label>
            <textarea ref={findingsRef} rows="4" id="name" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="name">Highlight Changes in plan of care</label>
            <textarea ref={changesRef} rows="3" id="name" />
          </div>
          <div className={classes.patient}>
            <label htmlFor="name">Doctor's Name</label>
            <input ref={doctorRef} type="text" id="name" />
          </div>
          <div className={classes.action}>
            <button className="btn">Submit</button>
            <button
              onClick={() => setReview(false)}
              type="button"
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
}
