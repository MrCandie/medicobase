import { useRef, useState } from "react";
import classes from "./medication.module.css";
import Spinner from "../spinner/spinner";

export default function AddMedication(props) {
  const [isLoading, setIsLoading] = useState(false);
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
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
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
