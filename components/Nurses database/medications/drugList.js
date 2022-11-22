import React, { use, useRef, useState } from "react";
import classes from "./medication.module.css";
import Spinner from "../../spinner/spinner";
import { SP } from "next/dist/shared/lib/utils";
import Overlay from "../../overlay/overlay";

export default function DrugList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const doseRef = useRef();
  const patientRef = useRef();
  const routeRef = useRef();
  const timeRef = useRef();

  const recordHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredDose = doseRef.current.value;
    const enteredPatient = patientRef.current.value;
    const enteredRoute = routeRef.current.value;
    const enteredTime = timeRef.current.value;

    const drugData = {
      name: enteredName,
      dose: enteredDose,
      patient: enteredPatient,
      route: enteredRoute,
      time: enteredTime,
    };

    setIsLoading(true);
    fetch("/api/medication/drugs", {
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
    <section className={classes.body}>
      <Overlay />
      <div className={classes.container}>
        <h1>Upload Patient Current Medications</h1>
        <hr />
        <form onSubmit={recordHandler}>
          <div className={classes.drug}>
            <label htmlFor="name">Drug Name</label>

            <input ref={nameRef} type="text" id="name" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="dose">Dose</label>
            <input ref={doseRef} id="dose" type="text" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="pt">Patient Name</label>
            <input ref={patientRef} id="pt" type="text" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="name">Route</label>
            <input ref={routeRef} id="name" type="text" />
          </div>
          <div className={classes.drug}>
            <label htmlFor="name">Time</label>
            <input ref={timeRef} id="name" type="text" />
          </div>
          <div className={classes.action}>
            <button className={classes.btn}>Submit</button>
            <button
              onClick={() => props.drug(false)}
              type="button"
              className={classes.btn}
            >
              cancel
            </button>
          </div>
        </form>
        {isLoading && <Spinner />}
      </div>
    </section>
  );
}
