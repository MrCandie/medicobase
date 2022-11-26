import { useRef, useState } from "react";
import classes from "./medication.module.css";
import Spinner from "../../spinner/spinner";
import Overlay from "../../overlay/overlay";
import Popup from "../../popup/popup";

export default function AddMedication(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const nameRef = useRef();
  const doseRef = useRef();
  const patientRef = useRef();
  const nurseRef = useRef();

  const recordHandler = (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredDose = doseRef.current.value;
    const enteredPatient = patientRef.current.value;
    const enteredNurse = nurseRef.current.value;

    if (!enteredDose || !enteredName || !enteredNurse || !enteredPatient) {
      return;
    }

    const drugData = {
      name: enteredName,
      dose: enteredDose,
      patient: enteredPatient,
      nurse: enteredNurse,
      timestamp: new Date().toISOString(),
    };

    setIsLoading(true);
    fetch("/api/medication", {
      method: "POST",
      body: JSON.stringify(drugData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError(true);
          setErrorMsg("Something went wrong... Try Later");
          setIsLoading(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        setMsg(data.message);
        setSuccess(true);
        setIsLoading(false);
      });
  };

  if (error) {
    return (
      <Popup>
        <p className="error">{errorMsg}</p>
        <div className="action">
          <button onClick={() => setError(false)} className="btn">
            Okay!
          </button>
        </div>
      </Popup>
    );
  }

  if (success) {
    return (
      <Popup>
        <p className="center">{msg}</p>
        <div className="action">
          <button onClick={() => setSuccess(false)} className="btn">
            Okay!
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <div className={classes.body}>
      <Overlay />
      <div className={classes.container}>
        <h2>Record Administered Medication</h2>
        <hr />
        <form onSubmit={recordHandler}>
          <div className={classes.drug}>
            <label htmlFor="name">Drug Name</label>

            <input ref={nameRef} type="text" id="name" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="dose">Drug Dosage Adminstered</label>
            <input ref={doseRef} id="dose" type="text" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="pt">Patient Name</label>
            <input ref={patientRef} id="pt" type="text" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="name">Nurse Name</label>
            <input ref={nurseRef} id="name" type="text" />
          </div>
          <div className={classes.action}>
            <button className={classes.btn}>Submit</button>
            <button
              onClick={() => props.setRecord(false)}
              type="button"
              className={classes.btn}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
      {isLoading && <Spinner />}
    </div>
  );
}
